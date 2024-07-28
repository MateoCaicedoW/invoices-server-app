const sequelize = require("../../database/db");
const { Company, CompanyUsers } = require("../../models/companies");
const { companyValidator } = require("../../validator_schemas/companies");
const uuid = require('uuid');

const createCompany = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: "Content can not be empty"})
    }

    const name = req.body.name;
    const {error} = companyValidator.validate(req.body, {abortEarly: false});
    if (error) {
        let errors = error.details.map(e => {
            return {
                field: e.context.key,
                message: e.message
            }
        })
        return res.status(400).json(errors)
    }

    const found = await sequelize.query(`SELECT * FROM companies WHERE lower(name) = :name`, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {name: name.trim().toLowerCase()}
    });

    if (found.length > 0) {
        return res.status(400).json([{
            field: "name",
            message: "Company with that name already exists"
        }])
    }

    const id = uuid.v4();
    const company = await Company.create({id: id, name: name});
    const user_id = req.user.id;
    try {
        const companyUserID = uuid.v4();
        await CompanyUsers.create({id: companyUserID, company_id: id, user_id: user_id});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }

    return res.status(200).json(company)
}

module.exports = {
    createCompany
}
