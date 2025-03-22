
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: '123',
  host: 'users-db',
  port: 5432,
  database: 'work_organizer_users',
});

client.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Connection error", err));

module.exports = client;
