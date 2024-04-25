const ReservaServices = require('../services/reserva.js')

module.exports = {
    /*
    getDispositivos: async (req, res, next) => {
        try {
          const categoria = req.params.categoria;
          dispositivos = await ReservaServices.getDispositivos(categoria);
          return res.status(200).json(dispositivos);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
      },
      */
      getReserva: async (req, res, next) => {
        const matricula_usuario = req.params.matricula;
        try {
          reserva = await ReservaServices.getReservaQuery(matricula_usuario);
          return res.status(200).json(reserva);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
      },

      getHorarios: async (req, res, next) => {
        const fecha = req.params.fecha;
        try {
          horarios = await ReservaServices.getHorariosQuery(fecha);
          return res.status(200).json(horarios);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
      },

      createReserva: async (req, res, next) => {
        const { id_sala, id_proyecto, lider_reserva, dia_reserva, hora_inicio, hora_final,dispositivos} = req.body;
        console.log("Datos recibidos controller:");
        console.log("ID de sala:", id_sala);
        console.log("ID de proyecto:", id_proyecto);
        console.log("Lider de reserva:", lider_reserva);
        console.log("Día de reserva:", dia_reserva);
        console.log("Hora de inicio:", hora_inicio);
        console.log("Hora final:", hora_final);
        console.log("dispositivos:", dispositivos);
        try {
          reserva = await ReservaServices.createReservaQuery(id_sala, id_proyecto, lider_reserva, dia_reserva, hora_inicio, hora_final,dispositivos);
          return res.status(200).json(reserva);
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
      },

};