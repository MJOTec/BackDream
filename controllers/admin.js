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
    getAdminDispositivosReservadosMes: async (req, res) => {
        try {
            DispositivosReservadosMes = await AdminServices.getAdminDispositivosReservadosMes()
            return res.status(200).json(DispositivosReservadosMes)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener los dispositivos. Err: ${err}` });
        }
    },
    getAdminDispositivosReservadosDia: async (req, res) => {
        try {
            DispositivosReservadosDia = await AdminServices.getAdminDispositivosReservadosDia()
            return res.status(200).json(DispositivosReservadosDia)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener los dispositivos. Err: ${err}` });
        }
    },
    getAdminDispositivosReservadosAno: async (req, res) => {
        try {
            DispositivosReservadosAno = await AdminServices.getAdminDispositivosReservadosAno()
            return res.status(200).json(DispositivosReservadosAno)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener los dispositivos. Err: ${err}` });
        }
    },
    getAdminSalasReservadasMes: async (req, res) => {
        try {
            SalasReservadasMes = await AdminServices.getAdminSalasReservadasMes()
            return res.status(200).json(SalasReservadasMes)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener las salas. Err: ${err}` });
        }
    },
    getAdminSalasReservadasDia: async (req, res) => {
        try {
            SalasReservadasDia = await AdminServices.getAdminSalasReservadasDia()
            return res.status(200).json(SalasReservadasDia)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener las salas. Err: ${err}` });
        }
    },
    getAdminSalasReservadasAno: async (req, res) => {
        try {
            SalasReservadasAno = await AdminServices.getAdminSalasReservadasAno()
            return res.status(200).json(SalasReservadasAno)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener las salas. Err: ${err}` });
        }
    },
    getAdminTodasSalasReservadasMes: async (req, res) => {
        try {
            const { ano, mes } = req.params;
            TodasSalasReservadasMes = await AdminServices.getAdminTodasSalasReservadasMes(ano, mes)
            return res.status(200).json(TodasSalasReservadasMes)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener las salas. Err: ${err}` });
        }
    },
    getAdminTodasSalasReservadasAno: async (req, res) => {
        try {
            const { ano } = req.params;
            TodasSalasReservadasAno = await AdminServices.getAdminTodasSalasReservadasAno(ano)
            return res.status(200).json(TodasSalasReservadasAno)
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Error al obtener las salas. Err: ${err}` });
        }
    }
};
