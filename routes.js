
const {login, signup, verifyToken, logout} = require('./handlers/auth/auth');
const setRoutes = (app) => {
    //login and signup routes
    app.post('/auth/login', login)
    app.post('/auth/signup', signup)

    //create secure routes using jwt
    app.use(verifyToken)
    app.delete('/auth/logout', logout)
    app.get('/secure', (req, res) => {
        return res.status(200).json({message: "This is a secure route"})
    })


}

module.exports = setRoutes;