const express = require('express');
const tasks = require('./tasks.js');
const router = express.Router(); 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/list/:id_client', async (req, res) => {
    try {
        const { id_client } = req.params;
        const tasklist = await tasks.list(id_client);
        console.log('task list', tasklist)
        res.json(tasklist);
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste des tâches :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la liste des tâches' });
    }
});

router.post('/create', jsonParser, async (req, res) => {
    try {
        console.log('req',req.body)
        const { title, date, id_client, status } = req.body;
        const newTask = await tasks.create_task(title, date, id_client, status);
        console.log('tache créée : status', status)
        res.status(201).json(newTask); 
    } catch (error) {
        console.error('Erreur lors de la création de la tâche :', error);
        res.status(500).json({ error: 'Erreur lors de la création de la tâche 2' });
    }
});

router.post('/update', jsonParser, async (req, res) => {
        try {
            const { id_task, status } = req.body;
            const updatedTask = await tasks.update_task(id_task, status);
            res.status(200).json(updatedTask);
            console.log('mis a jour réussie')
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
    }
});

router.post('/del', jsonParser, async (req, res) => {
    try {
        const { id_task } = req.body;
        await tasks.delete_task(id_task);
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la tâche' });
    }
});
module.exports = router;