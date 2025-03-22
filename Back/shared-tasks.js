const db = require('./db.js');

async function list() {
    return await db.select('SELECT * FROM shared_tasks')
}

async function getUserIdByEmail(email) {
    const query = 'SELECT id FROM users where email ILIKE $1';
    const values = [email];
    const res = await db.select(query, values);
    console.log('res', res[0].id)
    if (!res || res.length === 0) {
        throw new Error(`Utilisateur avec l'email "${email}" introuvable`);
    }

    return res[0].id;
}


async function create_shared_task(email, title) {
    try {
        const id_user = await getUserIdByEmail(email);
        const id_task = await getTaskIdByTitle(title);
        
        const queryTask = 'SELECT * FROM tasks WHERE id_task = $1';
        const taskValues = [id_task];
        console.log('taskValue', taskValues)
        const taskRes = await db.select(queryTask, taskValues);

        if (!taskRes || taskRes.length === 0) {
            throw new Error(`La tâche avec le titre "${title}" n'a pas été trouvée`);
        }
        
        const taskData = taskRes[0]; 
        console.log('taskData', taskData)
        const createTaskQuery = 'INSERT INTO tasks (id_client,date, title, status) VALUES ($1, $2, $3, $4) RETURNING id_task';
        const createTaskValues = [id_user, taskData.date, taskData.title, taskData.status];
        const newTaskRes = await db.insert(createTaskQuery, createTaskValues);

        const newTaskId = newTaskRes.rows[0].id_task; ;
        console.log('id_task', newTaskRes)
        console.log('Nouvelle tâche créée pour l\'utilisateur', email, 'avec ID:', newTaskId);

        const queryShared = 'INSERT INTO shared_tasks (id_user, id_task) VALUES ($1, $2) RETURNING *';
        const valuesShared = [id_user, newTaskId];
        const resShared = await db.insert(queryShared, valuesShared);

        console.log('Tâche partagée avec', email, 'sous la nouvelle ID:', newTaskId);
        return resShared[0];
    } catch (err) {
        console.error('Erreur lors de la création de la tâche partagée', err);
        throw err;
    }
}


async function getTaskIdByTitle(title) {
    console.log('title', title)
    const query = 'SELECT id_task FROM tasks WHERE title ILIKE $1';
    const values = [title];
    const res = await db.select(query, values);

    if (!res || res.length === 0) {
        throw new Error(`Tâche avec le titre "${title}" introuvable`);
    }
    console.log('res id', res[0].id_task)
    return res[0].id_task;
}

module.exports = {list, create_shared_task, getUserIdByEmail, getTaskIdByTitle}