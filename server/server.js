const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const api = require('./routes/api');
const user = require('./routes/users');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('server run');
})
app.listen(PORT, function(){
    console.log("server run on" + PORT);
})
app.use('/api', api);
app.use('/user',user);



