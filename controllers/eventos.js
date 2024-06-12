const EventosServices = require('../services/eventos.js')

module.exports = {
    getEventos: async (req, res) => {
        
        try{
            eventos = await EventosServices.getEventosQuery()
            return res.status(200).json(eventos)
        }catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
    },
};