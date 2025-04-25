const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
});
/**
 * @typedef Company
 */
const Company = mongoose.model('Company', companySchema, "companies");

module.exports = Company;