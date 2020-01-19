const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
   
    name: String,
    firstname: String,
    pseudo: String,
    mail: String,
    password: String,
    AccountStatus: Boolean,
   
})
module.exports = mongoose.model('user', userSchema, 'users') // (nom du model, nom du schema, nom de la collection de la bdd)