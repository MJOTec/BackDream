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

      getReservaQuery: async (matricula) => {
        const pool = await dbService.poolPromise;
        const sql = `
            SELECT R.*, P.nombre AS nombre_proyecto, S.nombre AS nombre_sala
            FROM Reserva AS R
            JOIN Proyecto AS P ON R.id_proyecto = P.id_proyecto
            JOIN Sala AS S ON R.id_sala = S.id_sala
            INNER JOIN AlumnosReserva AS AR ON R.id_reserva = AR.id_reserva
            INNER JOIN Usuario AS U ON AR.matricula = U.matricula
            WHERE AR.matricula = '${matricula}'
            
            UNION
            
            SELECT R.*, P.nombre AS nombre_proyecto, S.nombre AS nombre_sala
            FROM Reserva AS R
            JOIN Proyecto AS P ON R.id_proyecto = P.id_proyecto
            JOIN Sala AS S ON R.id_sala = S.id_sala
            INNER JOIN Usuario AS U ON R.lider_reserva = U.matricula
            WHERE R.lider_reserva = '${matricula}';
        `;
        
        const result = await pool.request().query(sql);
        const reservas = result.recordset;
    
        for (const reserva of reservas) {
            const idReserva = reserva.id_reserva;
            
            const dispositivosSql = `
                SELECT D.nombre, D.imagen, COUNT(DR.id_dispositivo) AS cantidad
                FROM DispositivoReservado AS DR
                JOIN Dispositivo AS D ON DR.id_dispositivo = D.id_dispositivo
                WHERE DR.id_reserva = ${idReserva}
                GROUP BY D.nombre, D.imagen;
            `;
            
            const dispositivosResult = await pool.request().query(dispositivosSql);
            reserva.dispositivos = dispositivosResult.recordset;
    
            const alumnosSql = `
                SELECT U.matricula, U.nombre
                FROM AlumnosReserva AS AR
                JOIN Usuario AS U ON AR.matricula = U.matricula
                WHERE AR.id_reserva = ${idReserva};
            `;
            
            const alumnosResult = await pool.request().query(alumnosSql);
            reserva.alumnos = alumnosResult.recordset;
        }
        
        console.log("Resultado de las reservas con dispositivos y alumnos:", reservas);
        console.log("entro al endpoint de reserva")
        return reservas;
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

      getHoyQuery:  async () => {
        const pool = await dbService.poolPromise;
        const sql = `EXEC GetReservasHoy;`
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

        // Insertar dispositivos reservados
        for (const dispositivo of dispositivos) {
          const { nombre, cantidad } = dispositivo;

          // Obtener los id_dispositivo necesarios
          const getDispositivosQuery = `
              SELECT TOP (${cantidad}) id_dispositivo
              FROM Dispositivo
              WHERE nombre = '${nombre}';
          `;
          const dispositivosResult = await pool.request().query(getDispositivosQuery);
          const dispositivosIds = dispositivosResult.recordset.map(record => record.id_dispositivo);

          for (const idDispositivo of dispositivosIds) {
              const insertDispositivoReservadoSql = `
                  INSERT INTO DispositivoReservado (id_reserva, id_dispositivo)
                  VALUES (${idReserva}, ${idDispositivo});
              `;
              await pool.request().query(insertDispositivoReservadoSql);
              console.log(`Dispositivo ${idDispositivo} asociado a la reserva ${idReserva}`);
          }
      }

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