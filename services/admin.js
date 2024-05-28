const dbService = require('../config/db.js');

module.exports = {
    getAdminReservasProximas: async () => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT 
                        R.id_reserva,
                        S.nombre AS sala,
                        U.nombre AS nombre,
                        U.apellido_paterno,
                        U.apellido_materno,
                        U.matricula,
                        R.hora_inicio,
                        R.hora_final,
                        R.fecha_generada AS fecha,
                        R.dia_reserva,
                        P.nombre AS proyecto,
                        STRING_AGG(D.nombre, ', ') AS dispositivos,
                        STRING_AGG(AU.matricula, ', ') AS alumnos_matriculas,
                        STRING_AGG(AU.nombre, ', ') AS alumnos_nombres
                    FROM 
                        Reserva R
                        JOIN Proyecto P ON R.id_proyecto = P.id_proyecto
                        JOIN Sala S ON R.id_sala = S.id_sala
                        JOIN Usuario U ON R.lider_reserva = U.matricula
                        LEFT JOIN AlumnosReserva AR ON R.id_reserva = AR.id_reserva
                        LEFT JOIN Usuario AU ON AR.matricula = AU.matricula
                        LEFT JOIN DispositivoReservado DR ON R.id_reserva = DR.id_reserva
                        LEFT JOIN Dispositivo D ON DR.id_dispositivo = D.id_dispositivo
                    WHERE 
                        R.dia_reserva < CAST(GETDATE() AS DATE)
                    GROUP BY
                        R.id_reserva,
                        S.nombre,
                        U.nombre,
                        U.apellido_paterno,
                        U.apellido_materno,
                        U.matricula,
                        R.hora_inicio,
                        R.hora_final,
                        R.fecha_generada,
                        R.dia_reserva,
                        P.nombre`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminReservasActuales: async () => {
        const pool = await dbService.poolPromise;
        const sql = `SELECT 
                        R.id_reserva,
                        S.nombre AS sala,
                        U.nombre AS nombre,
                        U.apellido_paterno,
                        U.apellido_materno,
                        U.matricula,
                        R.hora_inicio,
                        R.hora_final,
                        R.fecha_generada AS fecha,
                        R.dia_reserva,
                        P.nombre AS proyecto,
                        STRING_AGG(D.nombre, ', ') AS dispositivos,
                        STRING_AGG(AU.matricula, ', ') AS alumnos_matriculas,
                        STRING_AGG(AU.nombre, ', ') AS alumnos_nombres
                    FROM 
                        Reserva R
                        JOIN Proyecto P ON R.id_proyecto = P.id_proyecto
                        JOIN Sala S ON R.id_sala = S.id_sala
                        JOIN Usuario U ON R.lider_reserva = U.matricula
                        LEFT JOIN AlumnosReserva AR ON R.id_reserva = AR.id_reserva
                        LEFT JOIN Usuario AU ON AR.matricula = AU.matricula
                        LEFT JOIN DispositivoReservado DR ON R.id_reserva = DR.id_reserva
                        LEFT JOIN Dispositivo D ON DR.id_dispositivo = D.id_dispositivo
                    WHERE 
                        R.dia_reserva = CAST(GETDATE() AS DATE)
                    GROUP BY
                        R.id_reserva,
                        S.nombre,
                        U.nombre,
                        U.apellido_paterno,
                        U.apellido_materno,
                        U.matricula,
                        R.hora_inicio,
                        R.hora_final,
                        R.fecha_generada,
                        R.dia_reserva,
                        P.nombre`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    }
};