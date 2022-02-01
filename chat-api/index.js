const express = require('express');
const cors = require('cors');
const messages = require('./app/messages');
const dataBase = require('./dataBase');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/messages', messages);

const run = async () => {
    await dataBase.init();
    app.listen(port, () => {
        console.log('Server is listening port ' + port, '...');
    });
}

run().catch(error => console.log(error));