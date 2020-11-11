projectData = {};

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));

const cors = require('cors');
app.use(cors());

// routes
app.get('/all', function (req, res) {
    console.log('doing a get: ', projectData);
    res.send(projectData);
});

app.post('/add', function(req, res) {
    console.log('updating data: ', req.body);
    projectData = req.body;
});

const port = 3000;
const listenFunction = () => {
    console.log(`starting server from: ${port}`)
};

const server = app.listen(port, listenFunction);
