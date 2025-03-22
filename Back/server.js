const express = require('express');
const app = express();
const userRoutes = require('./users.routes.js');

app.use(express.json());

app.use('/users', userRoutes);

app.listen(4000, () => {
    console.log('User microservice running on port 4000');
});

