const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);
router.delete('/:userId', usersController.deleteUser);
router.put('/:userId', usersController.updateUser);
router.put('/:userId/associate/:companyId', usersController.associateUserWithCompany);

module.exports = router;
