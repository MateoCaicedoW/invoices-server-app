
const {login, signup, verifyToken} = require('./handlers/auth/auth');
const { createCompany, hasCompany, allCompaniesByUser} = require('./handlers/companies/handlers');
const setRoutes = (app) => {
    //login and signup routes
    app.post('/auth/login', login)
    app.post('/auth/signup', signup)

    //create secure routes using jwt
    app.use(verifyToken)
    app.get('/has-company/:user_id', hasCompany)
    app.post('/create-company', createCompany)
    app.get('/companies/:user_id/all', allCompaniesByUser)
    app.get('/secure', (req, res) => {
        return res.status(200).json({message: "This is a secure route"})
    })


}

module.exports = setRoutes;