const dbService = require('../config/db.js');

module.exports = {
    postAdminCrearEventoQuery: async (id_sala, nombre, foto, descripcion, nombre_encargado, fecha_evento, hora_inicio, hora_final) => {
        const pool = await dbService.poolPromise;
        const sql = `INSERT INTO Evento (id_sala, nombre, foto, descripcion, nombre_encargado, fecha_evento, hora_inicio, hora_final)
                    VALUES (${id_sala}, '${nombre}', '${foto}', '${descripcion}', '${nombre_encargado}', '${fecha_evento}', '${hora_inicio}', '${hora_final}');`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result;
    },
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
                        R.dia_reserva > CAST(GETDATE() AS DATE)
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
    },
    getAdminDispositivosReservadosMes: async () => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @startDate DATE = DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1);
                    DECLARE @endDate DATE = DATEADD(MONTH, 1, @startDate);

                    SELECT 
                        COUNT(DISTINCT DR.id_dispositivo) AS Dispositivos_Rentados
                    FROM 
                        DispositivoReservado DR
                    JOIN 
                        Reserva R ON DR.id_reserva = R.id_reserva
                    WHERE 
                        R.dia_reserva >= @startDate
                        AND R.dia_reserva < @endDate;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminDispositivosReservadosDia: async () => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @currentDate DATE = CAST(GETDATE() AS DATE);
        
                    SELECT 
                        COUNT(DISTINCT DR.id_dispositivo) AS Dispositivos_Rentados
                    FROM 
                        DispositivoReservado DR
                    JOIN 
                        Reserva R ON DR.id_reserva = R.id_reserva
                    WHERE 
                        R.dia_reserva = @currentDate;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminDispositivosReservadosAno: async () => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @startYear DATE = DATEFROMPARTS(YEAR(GETDATE()), 1, 1);
                    DECLARE @endYear DATE = DATEFROMPARTS(YEAR(GETDATE()) + 1, 1, 1);

                    SELECT 
                        COUNT(DISTINCT DR.id_dispositivo) AS Dispositivos_Rentados
                    FROM 
                        DispositivoReservado DR
                    JOIN 
                        Reserva R ON DR.id_reserva = R.id_reserva
                    WHERE 
                        R.dia_reserva >= @startYear
                        AND R.dia_reserva < @endYear;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminSalasReservadasMes: async () => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @startDate DATE = DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1);
                    DECLARE @endDate DATE = DATEADD(MONTH, 1, @startDate);

                    SELECT 
                        COUNT(DISTINCT R.id_sala) AS Salas_Reservadas
                    FROM 
                        Reserva R
                    WHERE 
                        R.dia_reserva >= @startDate
                        AND R.dia_reserva < @endDate;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminSalasReservadasDia: async () => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @currentDate DATE = CAST(GETDATE() AS DATE);
        
                    SELECT 
                        COUNT(DISTINCT R.id_sala) AS Salas_Reservadas
                    FROM 
                        Reserva R
                    WHERE 
                        R.dia_reserva = @currentDate;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminSalasReservadasAno: async () => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @startYear DATE = DATEFROMPARTS(YEAR(GETDATE()), 1, 1);
                    DECLARE @endYear DATE = DATEFROMPARTS(YEAR(GETDATE()) + 1, 1, 1);

                    SELECT 
                        COUNT(DISTINCT R.id_sala) AS Salas_Reservadas
                    FROM 
                        Reserva R
                    WHERE 
                        R.dia_reserva >= @startYear
                        AND R.dia_reserva < @endYear;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminTodasSalasReservadasMes: async (ano, mes) => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @year INT = ${ano};
                    DECLARE @month INT = ${mes};

                   ;WITH CTE_Days AS (
                    SELECT 
                        DATEADD(DAY, n.number, DATEFROMPARTS(@year, @month, 1)) AS dia_reserva
                    FROM 
                        (SELECT ROW_NUMBER() OVER (ORDER BY a.object_id) - 1 AS number
                        FROM sys.all_objects AS a) AS n
                    WHERE 
                        DATEADD(DAY, n.number, DATEFROMPARTS(@year, @month, 1)) < DATEADD(MONTH, 1, DATEFROMPARTS(@year, @month, 1))
                    )
                    SELECT 
                        CTE_Days.dia_reserva,
                        COUNT(DISTINCT R.id_sala) AS Salas_Reservadas
                    FROM 
                        CTE_Days
                        LEFT JOIN Reserva R ON CTE_Days.dia_reserva = R.dia_reserva
                    GROUP BY 
                        CTE_Days.dia_reserva
                    ORDER BY 
                        CTE_Days.dia_reserva;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    },
    getAdminTodasSalasReservadasAno: async (ano) => {
        const pool = await dbService.poolPromise;
        const sql = `DECLARE @year INT = ${ano};

                    WITH Months AS (
                        SELECT 1 AS month
                        UNION ALL
                        SELECT month + 1
                        FROM Months
                        WHERE month < 12
                    ),
                    
                    UniqueReservations AS (
                        SELECT 
                            R.id_sala,
                            MONTH(R.dia_reserva) AS month
                        FROM 
                            Reserva R
                        WHERE 
                            YEAR(R.dia_reserva) = @year
                        GROUP BY 
                            R.id_sala, MONTH(R.dia_reserva)
                    ),
                    
                    ReservationsCount AS (
                        SELECT 
                            month,
                            COUNT(DISTINCT id_sala) AS Salas_Reservadas
                        FROM 
                            UniqueReservations
                        GROUP BY 
                            month
                    )
                            
                    SELECT 
                        M.month AS mes,
                        ISNULL(RC.Salas_Reservadas, 0) AS Salas_Reservadas
                    FROM 
                        Months M
                        LEFT JOIN ReservationsCount RC ON M.month = RC.month
                    ORDER BY 
                        mes;`;
        const result = await pool.request().query(sql);
        console.log("", result);
        return result.recordset;
    }
};