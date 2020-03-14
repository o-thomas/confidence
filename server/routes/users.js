
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');
const crypto = require("../functions/crypt.js");
const stringFormat = require("../functions/stringFormat.js");
const mail = require("../functions/mail.js");
const config = require('../config/config');

router.get('/userLogin', (req, res) => {
  User.findOne({ mail: req.headers.mail, password: crypto.encrypt(req.headers.pass) }, function (err, user) {
    if (err) return next(err);
    if (user != null) {
      if (user.accountStatus == 0) {
        var error = {
          errorStatus: 1
        }
        res.status(200).send(error)
      } else {
        if (user) {
          mailCrypted = {}
          let token = jwt.sign({ username: req.headers.mail }, 'secret', { expiresIn: '3h' })
          mailCrypted.token = token
          res.status(200).json(mailCrypted)
        }
      }
    } else {
      var error = {
        errorStatus: 2
      }
      res.status(200).send(error)
    }
  })

})

router.post('/userRegister', (req, res) => {
  User.findOne({ mail: req.headers.mail }, function (err, result,next) {
    if (result != null) {
      var error = {
        errorStatus: 1
      }
      res.json(error)
    } else {
      User.findOne({ username: req.headers.username }, function (err, user,next) {
        if (user != null) {
          var error = {
            errorStatus: 2
          }
          res.status(200).send(error)
        } else {
          let userData = req.body
          userData.accountStatus = 0
          userData.password = crypto.encrypt(userData.password)
          userData.firstname = stringFormat.firstLetterUp(userData.firstname)
          userData.name = stringFormat.firstLetterUp(userData.name)
          let user = new User(userData)
          user.save(userData)
          var to = req.headers.mail 
          var subject = req.headers.subject// Subject line
          var text = '' // plaintext body
          var html = "<h3>" + req.headers.title + "</h3> <br><p>" + req.headers.message + "</p>" + "<br><a href = '"+  config.item.host+"confirmation?key=" + userData.keyconf + "&id=" + crypto.encrypt(userData.mail) + "'>"+config.item.host+"confirmation?key=" + userData.keyconf + "&id=" + crypto.encrypt(userData.mail) + "</a>";
          mail.mail(to, subject, text, html)
        }
      })
    }
  })
})

router.get('/confirmation', (req, res) => {
  var id = req.query.id
  User.update({ mail: crypto.decrypt(id) }, { $set: { accountStatus: 1 } }, function (err, user) {
      if (err) return next(err);
      if (user) {
          res.json(user);
      }
  })
})



router.get('/userVerif', verifToken, (req, res) => {
  User.findOne({ mail: decodedToken.username }, function (err, user) {
    if (user != null) {
      res.status(200).send(true)
    } else {
      res.status(200).send(false)
    }
    if (err) {
      res.status(200).send(false)
    }
  })
})

let decodedToken = ""
function verifToken(req, res, next) {
  let token = req.headers.authorization
  let tokenTab = token.split(" ")
  token = tokenTab[1]
  jwt.verify(token, 'secret', function (err, tokendata) {
    if (err) {
      res.status(400).json({ message: 'Requette non autorisé' })
    }
    decodedToken = tokendata
    next()
  })
}



module.exports = router;