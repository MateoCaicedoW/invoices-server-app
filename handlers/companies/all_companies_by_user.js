const sequelize = require("../../database/db");
const { CompanyUsers } = require("../../models/companies");


const allCompaniesByUser = async (req, res) => {
    const userID = req.params.user_id;
    try {
        const companies = await sequelize.query('SELECT companies.id, companies.name FROM companies JOIN company_users ON companies.id = company_users.company_id WHERE company_users.user_id = :userID', {
            type: sequelize.QueryTypes.SELECT,
            replacements: {userID},
        })

        return res.status(200).json(companies)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = allCompaniesByUser