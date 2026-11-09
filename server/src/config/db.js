import pg from 'pg';
const { Pool } = pg;
const connectionString = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'test' && !connectionString) throw new Error('TEST_DATABASE_URL must point to a dedicated test database.');
export const pool = new Pool({ connectionString });
