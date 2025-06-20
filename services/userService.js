import { sequelize, User } from '../models/Index.js'

export const userService = {
    getUserByEmail: async (email) => {
        return await User.findOne({
            where: { email }
        });
    },

    getAllUsersIds: async () => {
        const users = await User.findAll({
            attributes: ['id']
        });
        return users.map(user => user.id);
    },

    createUserByEmail: async (email) => {
        return await User.create({ email })
    },

    deleteUserByEmail: async (email) => {
        return await User.destroy({
            where: { email }
        })
    }
}