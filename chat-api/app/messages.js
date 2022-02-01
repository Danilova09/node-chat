const express = require('express');
const dataBase = require('../dataBase');
const router = express.Router();

router.get('/', (request, response) => {
    const messages = dataBase.getMessages();
    const date = request.query.datetime;
    if (date) {
        const datetime = new Date(request.query.datetime);
        if (isNaN(datetime.getDate())) {
            response.status(400).send({"error": "Date is invalid"});
        } else {
            const messagesByDate = dataBase.getMessagesByDate(datetime);
            response.send(messagesByDate);
        }
    } else {
        response.send(messages);
    }
});

router.post('/', async (request, response, next) => {
    if (request.body.author && request.body.message !== '') {
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
    } else {
        response.status(400).send({"error": "Author and message must me present in the request"});
    }
});

module.exports = router;