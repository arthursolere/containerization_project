const db = require('./db_tasks');

async function list(id_user) {
    try {
        const query = 'SELECT * FROM tasks WHERE id_client = $1';
        const values = [id_user];
        const res = await db.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des tâches', err);
        throw err;
    }
}

async function create_task(title, date, id_client, status) {
    try {
        const query = 'INSERT INTO tasks (id_client, date, title, status) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [id_client, date, title, status];
        const res = await db.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Erreur lors de la création de la tâche', err);
        throw err;
    }
}

async function update_task(id_task, status) {
    try {
        const query = 'UPDATE tasks SET status = $2 WHERE id_task = $1 RETURNING *';
        const values = [id_task, status];
        const res = await db.query(query, values);
        if (res.rows.length === 0) {
            throw new Error('Tâche non trouvée');
        }
        return res.rows[0];
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la tâche', err);
        throw err;
    }
}

async function delete_task(id_task) {
    try {
        const query = 'DELETE FROM tasks WHERE id_task = $1 RETURNING *';
        const values = [id_task];
        const res = await db.query(query, values);
        if (res.rows.length === 0) {
            throw new Error('Tâche non trouvée');
        }
        return res.rows[0];
    } catch (err) {
        console.error('Erreur lors de la suppression de la tâche', err);
        throw err;
    }
}

module.exports = { list, create_task, update_task, delete_task };