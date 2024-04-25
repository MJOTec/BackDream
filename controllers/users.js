const UserServices = require('../services/users.js')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
          users = await UserServices.getAllUsersQuery();
          return res.status(200).json(users);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
      },
      
};