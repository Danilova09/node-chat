const express = require('express');
const cors = require('cors');
const app = express();
const port= 5000;


app.use(cors());
app.use(express.json());

app.get('/messages', (request, response) => {
    response.send({message: 'main page'});
});

app.post('/messages', (request, response) => {
    console.log(request.body);
    response.send({message: 'main page'});
})


app.listen(port, () => {
    console.log('Server is listening port ' + port, '...');
})