const AdminServices = require('../services/admin.js')

module.exports = {
    getAdminReservasProximas: async (req, res) => {
        try{
            ReservaProximas = await AdminServices.getAdminReservasProximas()
            return res.status(200).json(ReservaProximas)
        }catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener la reserva. Err: ${err}` });
        }
    },
    getAdminReservasActuales: async (req, res) => {
        try {
            ReservaActuales = await AdminServices.getAdminReservasActuales()
            return res.status(200).json(ReservaActuales)
        } catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener la reserva. Err: ${err}` });
        }
    },
};
