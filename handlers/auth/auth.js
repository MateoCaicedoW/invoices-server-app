const {userValidator, loginValidator} = require('../../validator_schemas/users');
const User = require('../../models/users');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {error} = loginValidator.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        let errors = error.details.map(e => {
            return {
                field: e.context.key,
                message: e.message
            }
        })

        return res.status(400).json(errors)
    }

    const {email, password} = req.body;
    const user = await User.findOne({where: {email: email}}).then(user => user);

    if (!user) {
        return res.status(400).json([{
            field: 'email',
            message: 'User not found'
        }])
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json([{
            field: 'password',
            message: 'Invalid password'
        }])
    }

    const userAuth = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    }

    const token = jwt.sign(userAuth, "secret_key");
    return res.status(200).json({token:token, user: userAuth})
}

const signup = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: "Content can not be empty"})
    }

    let value = req.body.email;
    const user = await User.findOne({where: {email: value}}).then(user => user);
    if (user) {
        return res.status(400).json([{
            field: 'email',
            message: 'User already exists'
        }])
    }
    const {error} = userValidator.validate(req.body, {abortEarly: false});  
    if (error) {
        let errors = error.details.map(e => {
            return {
                field: e.context.key,
                message: e.message,
            }
        }) 

        return res.status(400).json(errors)
    }

    const {first_name, last_name, email, password} = req.body;
    const id = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({id, first_name, last_name, email, password: hashedPassword});
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const verifyToken = async (req, res, next) =>{
    const token = req.header("Authorization") || "";
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }

    try {
        const payload = jwt.verify(token, "secret_key");
        req.user = payload;
        next();

    }catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}



module.exports = {
    login,
    signup,
    verifyToken
}