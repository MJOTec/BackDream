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
    },

    createProyecto: async (nombre, descripcion, imagen, lider_proyecto) => {
        console.log("Datos recibidos para crear proyecto:");
        console.log("Nombre:", nombre);
        console.log("Descripción:", descripcion);
        console.log("Imagen:", imagen);
        console.log("Líder del proyecto:", lider_proyecto);

        const pool = await dbService.poolPromise;

        const sql = `
            INSERT INTO Proyecto (nombre, descripcion, imagen, lider_proyecto)
            VALUES ('${nombre}', '${descripcion}', '${imagen}', ${lider_proyecto ? `'${lider_proyecto}'` : 'NULL'});
            SELECT SCOPE_IDENTITY() AS id_proyecto;
        `;

        try {
            const result = await pool.request().query(sql);
            const idProyecto = result.recordset[0].id_proyecto; // Obtener el ID del proyecto recién insertado
            console.log("ID del proyecto insertado:", idProyecto);

            return { id_proyecto: idProyecto, nombre, descripcion, imagen, lider_proyecto };
        } catch (error) {
            console.error("Error al insertar el proyecto:", error);
            throw error;
        }
    },

    addIntegrante: async (id_proyecto, matricula) => {
        console.log("Datos recibidos para agregar integrante:");
        console.log("ID del proyecto:", id_proyecto);
        console.log("Matrícula:", matricula);

        const pool = await dbService.poolPromise;

        const sql = `
            INSERT INTO Integrante (id_proyecto, matricula)
            VALUES (${id_proyecto}, '${matricula}');
        `;

        try {
            const result = await pool.request().query(sql);
            console.log(`Integrante con matrícula ${matricula} agregado al proyecto ${id_proyecto}`);
            return result;
        } catch (error) {
            console.error("Error al insertar el integrante:", error);
            throw error;
        }
    }
};
