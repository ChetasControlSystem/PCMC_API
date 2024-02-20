const { ConnectionPool } = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  user: 'sa',
  password: 'admin@123',
  server: 'WIN-H2QIUQIAP91',
  database: 'New_APP',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const insertDataConfig = {
  user: 'sa',
  password: 'admin@123',
  server: 'WIN-H2QIUQIAP91',
  database: 'Smart_City_Data',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const pool = new ConnectionPool(config);
const insertDataPool = new ConnectionPool(insertDataConfig);

module.exports = {
  pool,
  insertDataPool
};
