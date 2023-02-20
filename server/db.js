import mysql, { createConnection } from "mysql2";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

console.log(process.env.DB_HOST);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_DBNAME,
  password: process.env.DB_PASSWORD,
});

export default db;
