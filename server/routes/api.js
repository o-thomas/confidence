const express = require('express');
const router = express.Router();
const User = require('../models/users');
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/confidence";
const app = express();

mongoose.connect(db, err => {
    if (err) {
        console.error('erreur' + err);
    } else {
        console.log('conecté a mongodb');
    }
})

app.use('/static', express.static('./static'));

app.get('/', (req, res) => {
    res.send('from api route');
})



module.exports = router;