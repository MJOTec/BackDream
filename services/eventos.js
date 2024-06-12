const dbService = require('../config/db.js');

module.exports = {
    getEventosQuery: async () => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT *
                    FROM Evento`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    }
};