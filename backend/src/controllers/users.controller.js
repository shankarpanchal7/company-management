const {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    deleteUserService,
    updateUserService,
    associateUserWithCompanyService
  } = require('../services/users.service');
  
  const createUser = async (req, res) => {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  };
  
  const getAllUsers = async (req, res) => {
    const users = await getAllUsersService();
    res.status(200).json(users);
  };
  
  const getUserById = async (req, res) => {
    const user = await getUserByIdService(req.params.userId);
    res.status(200).json(user);
  };
  
  const deleteUser = async (req, res) => {
    await deleteUserService(req.params.userId);
    res.sendStatus(204);
  };
  
  const updateUser = async (req, res) => {
    const updatedUser = await updateUserService(req.params.userId, req.body);
    res.status(200).json(updatedUser);
  };
  
  const associateUserWithCompany = async (req, res) => {
    const user = await associateUserWithCompanyService(req.params.userId, req.params.companyId);
    res.status(200).json(user);
  };
  
  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    associateUserWithCompany
  };
  