import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
} = process.env;
const Client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  user: POSTGRES_USER,
  port: Number(POSTGRES_PORT),
});
export default Client;
