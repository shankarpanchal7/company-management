const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companies.controller');

router.post('/', companiesController.createCompany);
router.get('/', companiesController.getAllCompanies);
router.get('/:companyId', companiesController.getCompanyById);
router.delete('/:companyId', companiesController.deleteCompany);
router.put('/:companyId', companiesController.updateCompany);

module.exports = router;
