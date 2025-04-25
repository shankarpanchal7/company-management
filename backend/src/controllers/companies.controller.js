const companiesService = require('../services/companies.service');

const createCompany = async (req, res) => {
  try {
    const { name, city } = req.body;
    const company = await companiesService.createCompany(name, city);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await companiesService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await companiesService.getCompanyById(companyId);
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const response = await companiesService.deleteCompany(companyId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { name, city } = req.body;
    const company = await companiesService.updateCompany(companyId, name, city);
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
  updateCompany
};
