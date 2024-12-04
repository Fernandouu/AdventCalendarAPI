import {config} from 'dotenv';

config()

export const PORT = process.env.PORT 
export const DB_USER = process.env.DB_USER 
export const DB_PASSWORD = process.env.DB_PASSWORD  
export const DB_HOST = process.env.DB_HOST  
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_PORT = process.env.DB_PORT || 3306;

console.log({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
  });
  