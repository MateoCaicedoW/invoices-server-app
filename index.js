const express = require('express');
const app = express();
const port = 8080;
const setRoutes = require('./routes.js');
const sequelize = require('./database/db');
const cookieParser = require("cookie-parser");
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(cookieParser())
setRoutes(app);

const main = async () => {
    try {
        await sequelize.sync()
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    } catch (error) {
        console.log(error.message)
    }   
}

main()


