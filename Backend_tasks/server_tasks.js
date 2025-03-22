const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./tasks.routes.js');
const db = require('./db_tasks.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRoutes);

// Ensure database connection before starting server
db.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1);
    });

module.exports = app;