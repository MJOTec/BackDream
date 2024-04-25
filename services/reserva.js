const dbService = require('../config/db.js')

module.exports = {

      getReservaQuery:  async (matricula) => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT R.*, P.nombre AS nombre_proyecto, S.nombre AS nombre_sala
        FROM Reserva AS R
        JOIN Proyecto AS P ON R.id_proyecto = P.id_proyecto
        JOIN Sala AS S ON R.id_sala = S.id_sala
        WHERE R.lider_reserva = '${matricula}';`
        const result = await pool.request().query(sql);
        console.log("", result)
        return result.recordset;
      },

      getHorariosQuery: async (fecha) => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT hora_inicio, hora_final
        FROM Reserva
        WHERE dia_reserva = '${fecha}';`
        const result = await pool.request().query(sql);
        console.log("", result)
        return result.recordset;
      },

      createReservaQuery: async (id_sala, id_proyecto, lider_reserva, dia_reserva, hora_inicio, hora_final, dispositivos) => {
        console.log("Datos recibidos service:");
        console.log("ID de sala:", id_sala);
        console.log("ID de proyecto:", id_proyecto);
        console.log("Lider de reserva:", lider_reserva);
        console.log("Día de reserva:", dia_reserva);
        console.log("Hora de inicio:", hora_inicio);
        console.log("Hora final:", hora_final);
        console.log("Hora final:", dispositivos);

        const pool = await dbService.poolPromise;
      
        const sql = `
          INSERT INTO Reserva (id_sala, id_proyecto, lider_reserva, fecha_generada, dia_reserva, hora_inicio, hora_final)
          VALUES (${id_sala}, ${id_proyecto}, '${lider_reserva}', GETDATE() , '${dia_reserva}', '${hora_inicio}', '${hora_final}')
        `;
      
        try {
          const result = await pool.request().query(sql);
          console.log("Registro insertado correctamente:", result);
          return result.recordset;
        } catch (error) {
          console.error("Error al insertar el registro:", error);
          throw error;
        }
      }, 

};