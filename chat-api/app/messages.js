const express = require('express');
const dataBase = require('../dataBase');
const router = express.Router();

router.get('/', (request, response) => {
    const messages = dataBase.getMessages();
    response.send(messages);
});

router.post('/', async (request, response, next) => {
    try {
        const message = {
            author: request.body.author,
            message: request.body.message,
        }
        await dataBase.addItem(message);
        response.send(message);
    } catch (error) {
        next(error);
    }
})

module.exports = router;