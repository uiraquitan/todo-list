const mysql = require("mysql2/promise");

require("dotenv").config();

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;


const connection = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWD,
    database: DATABASE
});

module.exports = connection;