const User = require('../models/users.model');

const createUserService = async (data) => {
    const user = await User.create(data);
    return user;
};

const getAllUsersService = async () => {
    const users = await User.find({})
        .populate({
            path: 'companies',
            select: 'name city -_id'
        })
        .select('name email phone companies');
    return users;
};

const getUserByIdService = async (userId) => {
    return await User.findById(userId).populate('companies');
};

const deleteUserService = async (userId) => {
    await User.findByIdAndDelete(userId);
};

const updateUserService = async (userId, data) => {
    return await User.findByIdAndUpdate(userId, data, { new: true });
};

const associateUserWithCompanyService = async (userId, companyId) => {
    return await User.findByIdAndUpdate(
        userId,
        { $addToSet: { companies: companyId } },
        { new: true }
    ).populate('companies');
};

module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    deleteUserService,
    updateUserService,
    associateUserWithCompanyService
};
