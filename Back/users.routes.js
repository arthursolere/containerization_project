const express = require('express');
const users = require('./users.js');
const router = express.Router(); 
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/list', async (req, res) => {
    const userlist = await users.list();
        res.json(userlist);
    });

router.post('/create', jsonParser, async (req, res)=> {
    console.log('users.routes.js', '/create', req.body)
    const { email, password, pseudo, name } = req.body; 
    if (!email || !password) {
        return res.json({ message: 'Email et mot de passe sont requis' });  
    }
    
    const newUser = await users.create_user(email, password, pseudo, name);  
    res.json(newUser);  
});


router.get('/:email', async (req, res) => {
    const { email } = req.params;  
    
    const user = await users.connect_user(email);  
    if (user) {
        return res.json(user);
    } else {
        return res.json({ message: 'Utilisateur non trouvé' }); 
    }
});


router.post('/update/:id', jsonParser, async (req, res) => {
    const { id, email, password, pseudo, name } = req.body;

    if (!id) {
        return res.json({ message: 'ID est requis' });
    }

    const updatedUser = await users.update_user(id, email, password, pseudo, name);
    console.log('users.routes.js', '/update/:id', id, email, password, pseudo, name)
    if (updatedUser) {
        return res.json(updatedUser);
    } else {
        return res.json({ message: 'Utilisateur non trouvé ou mise à jour échouée' });
    }
});

module.exports = router;
