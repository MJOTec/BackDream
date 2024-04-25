const SalaServices = require('../services/sala.js')

module.exports = {

    getAllSalas: async (req, res, next) => {

        try {
          salas = await SalaServices.getAllSalasQuery();
          return res.status(200).json(salas);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err: ${err}` });
        }

      },

      getDispositivosSala: async (req, res, next) => {
        const categoria = req.params.categoria;
        
        try {
          dispositivos = await SalaServices.getDispositivosSalaQuery(categoria);
          return res.status(200).json(dispositivos);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err: ${err}` });
        }

      },

};