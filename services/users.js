const dbService = require('../config/db.js')

module.exports = {
    // EJEMPLO DEL SEMESTRE 4
    getAllUsersQuery:  async () => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT * 
                      FROM Usuario`
        const result = await pool.request().query(sql);
        console.log("", result)
        return result.recordset;
      },
      getMatriculasQuery:  async () => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT matricula, nombre 
                      FROM Usuario`
        const result = await pool.request().query(sql);
        console.log("", result)
        return result.recordset;
      },

};