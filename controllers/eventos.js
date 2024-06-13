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
    getEventoIndividual: async (req, res) => {
        const id_evento = req.params.id_evento;
        try{
            eventos = await EventosServices.getEventoIndividualQuery(id_evento)
            return res.status(200).json(eventos)
        }catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
    },
    getEventosMatricula: async (req, res) => {
        const matricula = req.params.matricula;
        try{
            eventos = await EventosServices.getEventosMatriculaQuery(matricula)
            return res.status(200).json(eventos)
        }catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
    },

    postEventosReserva: async (req, res) => {
        const { id_evento, matricula} = req.body;
        try{
            eventos = await EventosServices.postEventosReserva(id_evento, matricula)
            return res.status(200).json(eventos)
        }catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
    },
};