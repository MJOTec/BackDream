const dbService = require('../config/db.js')

module.exports = {
    // EJEMPLO DEL SEMESTRE 4
    getAllSalasQuery:  async () => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT * 
                      FROM Sala`
        const result = await pool.request().query(sql);
        console.log("", result)
        return result.recordset;
      },
    
    getDispositivosSalaQuery: async (categoria) => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT nombre, imagen, COUNT(*) AS cantidad
                        FROM Dispositivo
                        WHERE categoria = '${categoria}' 
                        GROUP BY nombre, categoria, imagen;`
        console.log("Consulta SQL:", sql);
        const result = await pool.request().query(sql);
        console.log("", result)
        return result.recordset;
    },
 
};