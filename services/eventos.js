const dbService = require('../config/db.js');

module.exports = {
    getEventosQuery: async () => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT Evento.*, Sala.nombre AS nombre_sala
        FROM Evento
        JOIN Sala ON Evento.id_sala = Sala.id_sala;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },

    getEventoIndividualQuery: async (id_evento) => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT Evento.*, Sala.nombre AS nombre_sala
        FROM Evento
        JOIN Sala ON Evento.id_sala = Sala.id_sala
        WHERE Evento.id_evento = '${id_evento}';`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    
    getEventosMatriculaQuery: async (matricula) => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT e.*, s.nombre AS nombre_sala
        FROM Evento e
        JOIN EventoReserva er ON e.id_evento = er.id_evento
        JOIN Sala s ON e.id_sala = s.id_sala
        WHERE er.matricula = '${matricula}';`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },

    postEventosReserva: async (id_evento, matricula) => {
        const pool = await dbService.poolPromise;
    
        // Verificar si el registro ya existe
        const checkSql = `SELECT * FROM EventoReserva WHERE id_evento = '${id_evento}' AND matricula = '${matricula}';`;
        const checkResult = await pool.request().query(checkSql);
    
        if (checkResult.recordset.length > 0) {
            // Si ya existe el registro
            return { message: 'Este evento ya ha sido reservado' };
        } else {
            try {
                // Iniciar una transacción
                const transaction = await pool.transaction();
                await transaction.begin();
    
                // Si no existe el registro, realizar la inserción
                const insertSql = `INSERT INTO EventoReserva (id_evento, matricula) VALUES ('${id_evento}', '${matricula}');`;
                await transaction.request().query(insertSql);
    
                // Actualizar el atributo cupo en la tabla Evento
                const updateSql = `UPDATE Evento SET cupo = cupo - 1 WHERE id_evento = '${id_evento}';`;
                await transaction.request().query(updateSql);
    
                // Confirmar la transacción
                await transaction.commit();
    
                return { message: 'Tu evento ha sido reservado con éxito' };
            } catch (err) {
                // En caso de error, revertir la transacción
                if (transaction) await transaction.rollback();
                throw err;
            }
        }
    },
    
};