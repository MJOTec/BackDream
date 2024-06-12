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
    getEventosMatriculaQuery: async (matricula) => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT e.*
        FROM Evento e
        JOIN EventoReserva er ON e.id_evento = er.id_evento
        WHERE er.matricula = '${matricula}'`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    }
};