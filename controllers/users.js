const UserServices = require('../services/users.js')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
          users = await UserServices.getAllUsersQuery();
          return res.status(200).json(users);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los usuarios. Err: ${err}` });
        }
      },
      getMatriculas: async (req, res, next) => {
        try {
          users = await UserServices.getMatriculasQuery();
          return res.status(200).json(users);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los usuarios . Err: ${err}` });
        }
      },
      
};