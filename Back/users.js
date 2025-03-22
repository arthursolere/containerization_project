// 'id : serial, email : text, password : text'

const { Client } = require('pg');

const client = require('./db.js');
async function list() {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
}

/*const db = require('./db.js');

async function list() {
    return await db.select('SELECT * FROM users')
}
*/
async function create_user(email, password, pseudo, name) {
    try {
        const checkQuery = 'SELECT * FROM users WHERE email = $1';
        const checkValues = [email];
        const checkRes = await client.query(checkQuery, checkValues);

        /*if (checkRes.rows.length > 0) {
            throw new Error('Email already in use');
        }*/

        console.log('post');
        const query = 'INSERT INTO users (email, password, pseudo, name) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [email, password, pseudo, name];
    
        const res = await client.query(query, values);
        return res.rows[0];  
    } catch (err) {
        console.error('Erreur lors de la création de l\'utilisateur', err);
        throw err;
    }
}

async function connect_user(email) {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
    
        const res = await client.query(query, values);
    
        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return null; 
        }
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
        throw err;
    }
}

async function update_user(id, email, password, pseudo, name) {
    try {
        console.log(id)
        const query = 'UPDATE users SET email = $2, password = $3, pseudo = $4, name = $5 WHERE id = $1 RETURNING *';
        const values = [id, email, password, pseudo, name];
        
        const res = await client.query(query, values);
        
        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
        throw err;
    }
}
module.exports = { list, create_user, connect_user, update_user };
