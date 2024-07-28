const { CompanyUsers } = require("../../models/companies");


const hasCompany = async (req, res) => {
    const userID = req.params.user_id;
    try {
        const company = await CompanyUsers.findOne({where: {user_id: userID}});
        if (!company) {
            return res.status(404).json({message: "Company not found"})
        }
        return res.status(200).json(company)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

module.exports = hasCompany