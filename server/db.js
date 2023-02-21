import mysql, { createConnection } from "mysql2";
import * as dotenv from "dotenv-flow"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({
  node_env: "dev",
  default_node_env: "dev",
});
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_DBNAME,
  password: process.env.DB_PASSWORD,
});

export default db;
