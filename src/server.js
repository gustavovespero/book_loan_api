const express = require('express');
const routes = require('./routes');
const path = require('path');
const router = express.Router();
const app = express();

require('./index.js');

__dirname = 'view';

router.get('/',function(req,res){
    res.sendFile(path.join('/index.html'), { root: __dirname });
});

app.use(express.json());
app.use(routes);
app.use('/', router);

app.listen(3000);