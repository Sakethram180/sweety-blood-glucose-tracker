import 'dotenv/config';import { readFile } from 'node:fs/promises';import { pool } from '../config/db.js';
try{const sql=await readFile(new URL('../../database/migrations/001_initial.sql',import.meta.url),'utf8');await pool.query(sql);console.log('Database schema is up to date.')}catch(e){console.error(e);process.exitCode=1}finally{await pool.end()}
