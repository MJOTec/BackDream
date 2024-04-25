const ProyectoServices = require('../services/proyecto.js')

module.exports = {
    getProyecto: async (req, res) => {
        const matricula = req.params.matricula;
        try{
            proyecto = await ProyectoServices.getProyectoQuery(matricula)
            return res.status(200).json(proyecto)
        }catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
    },
};