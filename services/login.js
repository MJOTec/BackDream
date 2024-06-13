const dbService = require('../config/db.js');

module.exports = {
    getLoginQuery: async (matricula, contrasena) => {
        
        
        const pool = await dbService.poolPromise;
        const sql = `select matricula, contrasena , rol from Usuario WHERE matricula = '${matricula}' AND contrasena = '${contrasena}'`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
        
    }
};