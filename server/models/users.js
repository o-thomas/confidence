const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
   
    name: String,
    firstname: String,
    username: String,
    mail: String,
    password: String,
    accountStatus: Number,
    keyconf: String,
   
})
module.exports = mongoose.model('user', userSchema, 'users') // (nom du model, nom du schema, nom de la collection de la bdd)