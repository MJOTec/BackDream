const sql = require("mssql"); //Nota, tal vez falte instalar un paquete NPM para MYSQLSERVER, me late que sería "npm install mssql"
const dotenv = require("dotenv");
dotenv.config();

const config = {
    user: process.env.DB_USER,
    server: process.env.DB_SERVER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    options:{
      trustServerCertificate: true,
      connectionTimeout: 30000,
    }
  };

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
    sql,
    poolPromise,
};