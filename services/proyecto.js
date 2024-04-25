const dbService = require('../config/db.js');

module.exports = {
    getProyectoQuery: async (matricula) => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT *
                    FROM Proyecto P
                    JOIN Integrante I ON P.id_proyecto = I.id_proyecto
                    WHERE I.matricula = '${matricula}'`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    }
};