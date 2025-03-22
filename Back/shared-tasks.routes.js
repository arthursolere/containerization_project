const express = require('express');
const sharedtasks = require('./shared-tasks.js');
const router = express.Router(); 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/list', async (req, res) => {
    const sharedtasklist = await sharedtasks.list();
        res.json(sharedtasklist);
    });

router.post('/create', jsonParser, async (req, res) => {
    try {
        console.log('req', req.body);
        const { email, title } = req.body;

        if (!email || !title) {
            return res.status(400).json({ error: 'Email et titre sont requis' });
        }

        const newTask = await sharedtasks.create_shared_task(email, title);
        console.log('Tâche partagée', title);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Erreur lors de la création de la tâche partagée :', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;