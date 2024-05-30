const dbService = require('../config/db.js');
const reserva = require('../controllers/reserva.js');

module.exports = {
      getReservaRFIDQuery:  async (RFID) => {
        const pool = await dbService.poolPromise;
        const sql = `EXEC GetReservationsByRFID @RFID = '${RFID}';`
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

      createReservaQuery: async (id_sala, id_proyecto, lider_reserva, dia_reserva, hora_inicio, hora_final, dispositivos, integrantes) => {
        console.log("Datos recibidos service:");
        console.log("ID de sala:", id_sala);
        console.log("ID de proyecto:", id_proyecto);
        console.log("Lider de reserva:", lider_reserva);
        console.log("Día de reserva:", dia_reserva);
        console.log("Hora de inicio:", hora_inicio);
        console.log("Hora final:", hora_final);
        console.log("Dispositivos:", dispositivos);
        console.log("Integrantes:", integrantes);

        const pool = await dbService.poolPromise;
      
        const sql = `
          INSERT INTO Reserva (id_sala, id_proyecto, lider_reserva, fecha_generada, dia_reserva, hora_inicio, hora_final)
          VALUES (${id_sala}, ${id_proyecto}, '${lider_reserva}', GETDATE() , '${dia_reserva}', '${hora_inicio}', '${hora_final}');
          SELECT SCOPE_IDENTITY() AS id_reserva;
        `;
      
        try {
          const result = await pool.request().query(sql);
          const idReserva = result.recordset[0].id_reserva; // Obtener el ID de la reserva recién insertada
          console.log("ID de reserva insertada:", idReserva);
          for (const integrante of integrantes) {
            // Verificar si ya existe una relación de alumno-reserva con el mismo id_reserva y matricula
            const existingRelationQuery = `
              SELECT COUNT(*) AS count
              FROM AlumnosReserva
              WHERE id_reserva = ${idReserva} AND matricula = '${integrante.matricula}';
            `;
            const existingRelationResult = await pool.request().query(existingRelationQuery);
            const existingRelationCount = existingRelationResult.recordset[0].count;

            if (existingRelationCount === 0) {
                const insertAlumnoSql = `
                  INSERT INTO AlumnosReserva (id_reserva, matricula)
                  VALUES (${idReserva}, '${integrante.matricula}');
                `;
                await pool.request().query(insertAlumnoSql);
                console.log(`Alumno ${integrante.matricula} asociado a la reserva ${idReserva}`);
            } else {
                console.log(`La relación de alumno ${integrante.matricula} con la reserva ${idReserva} ya existe. No se realiza la inserción.`);
            }
        }
        
          console.log("Registro insertado correctamente:", result);
          return result.recordset;
        } catch (error) {
          console.error("Error al insertar el registro:", error);
          throw error;
        }
      },

      createReservaChatQuery: async (id_sala, id_proyecto, lider_reserva, dia_reserva, hora_inicio, hora_final) => {
        console.log("Datos recibidos service:");
        console.log("ID de sala:", id_sala);
        console.log("ID de proyecto:", id_proyecto);
        console.log("Lider de reserva:", lider_reserva);
        console.log("Día de reserva:", dia_reserva);
        console.log("Hora de inicio:", hora_inicio);
        console.log("Hora final:", hora_final);

        const pool = await dbService.poolPromise;
      
        const sql = `
          INSERT INTO Reserva (id_sala, id_proyecto, lider_reserva, fecha_generada, dia_reserva, hora_inicio, hora_final)
          VALUES (${id_sala}, ${id_proyecto}, '${lider_reserva}', GETDATE() , '${dia_reserva}', '${hora_inicio}', '${hora_final}');
          SELECT SCOPE_IDENTITY() AS id_reserva;
        `;
      
        try {
          const result = await pool.request().query(sql);
          const idReserva = result.recordset[0].id_reserva; // Obtener el ID de la reserva recién insertada
          console.log("ID de reserva insertada:", idReserva);
          return result.recordset;
        } catch (error) {
          console.error("Error al insertar el registro:", error);
          throw error;
        }
      },

      cancelReservaQuery: async (id) => {
        try {
          const pool = await dbService.poolPromise;
          const sql = `execute DeleteReservas @id_reserva = '${id}';`
          const result = await pool.request().query(sql);
          console.log("", result)
          return result.recordset;
        } catch (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          throw err;
        }
      },
      
};