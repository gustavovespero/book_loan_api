const express = require('express');
const routes = require('./routes');
const path = require('path');
const router = express.Router();
const cors = require('cors')

const app = express();

app.use(cors())

require('./index.js');

app.use(express.json());
app.use(routes);
app.use('/', router);

app.listen(3003);