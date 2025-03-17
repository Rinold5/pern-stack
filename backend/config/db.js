import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT} = process.env;

// Creates Sql connection string using the environment variables
export const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);

 
