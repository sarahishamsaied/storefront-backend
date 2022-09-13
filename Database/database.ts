import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PORT, POSTGRES_PASSWORD } =
  process.env;
const POSTGRES_DB =
  process.env.ENV === 'DEV'
    ? process.env.POSTGRES_DB
    : process.env.POSTGRES_DB_TEST;
const Client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  user: POSTGRES_USER,
  port: Number(POSTGRES_PORT),
});
export default Client;
