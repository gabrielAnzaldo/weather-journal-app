projectData = {};

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));

const cors = require('cors');
app.use(cors());

const port = 3000;
const listenFunction = () => {
    console.log(`starting server from: ${port}`)
};

const server = app.listen(port, listenFunction);
