const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'tasks_db',
    database: process.env.POSTGRES_DB || 'work_organizer_tasks',
    password: process.env.POSTGRES_PASSWORD || '456',
    port: process.env.POSTGRES_PORT || 5432,
});

async function query(text, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
}

async function connect() {
    try {
        await pool.query('SELECT 1'); 
        console.log('Connected to PostgreSQL');
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
}

module.exports = { query, connect };