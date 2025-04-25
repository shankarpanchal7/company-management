const Company = require('../models/companies.model');
const User = require('../models/users.model');

const createCompany = async (name, city) => {
  try {
    const company = new Company({ name, city });
    await company.save();
    return company;
  } catch (error) {
    throw new Error(`Error creating company: ${error.message}`);
  }
};

const getCompanyById = async (companyId) => {
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  } catch (error) {
    throw new Error(`Error fetching company: ${error.message}`);
  }
};

const getAllCompanies = async () => {
  try {
    const companies = await Company.find();
    return companies;
  } catch (error) {
    throw new Error(`Error fetching companies: ${error.message}`);
  }
};

const deleteCompany = async (companyId) => {
  try {
    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    await User.updateMany(
      { companies: companyId },
      { $pull: { companies: companyId } }
    );
    return { message: 'Company deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting company: ${error.message}`);
  }
};

const updateCompany = async (companyId, name, city) => {
  try {
    const company = await Company.findByIdAndUpdate(
      companyId,
      { name, city },
      { new: true }
    );
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  } catch (error) {
    throw new Error(`Error updating company: ${error.message}`);
  }
};

module.exports = {
  createCompany,
  getCompanyById,
  getAllCompanies,
  deleteCompany,
  updateCompany
};
