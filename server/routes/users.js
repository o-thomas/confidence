
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');
const crypto = require("../functions/crypt.js");
const mail = require("../functions/mail.js");

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
          console.log(token)
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

router.post('/userRegister', (req, res, next) => {
  let pass = req.headers.pass

  User.findOne({ rpps: req.headers.userName }, function (err, res) {
    if (res != null) {
      var error = {
        errorStatus: 1
      }
      res.status(200).send(errorStatus)
    } else {
      User.findOne({ mail: req.headers.mail }, function (err, test) {
        if (test != null) {
          var error = {
            errorStatus: 2
          }
          res.status(200).send(mess)
        } else {
          let userData = req.body
          console.log(req.body)
          let user = new User(userData)
          user.save(userData)
          user.pass = crypto.encrypt(pass)
          res.status(200).send(userData)
          var to = req.query.mail // list of receivers (who receives)
          var subject = 'Inscription au registre'// Subject line
          var text = '' // plaintext body
          var html = "<h3> Bienvenue sur le registre d'oncologie' !</h3><br> Pour activer votre compte, veuillez cliquer sur le lien ci-dessous ou copier/coller dans votre navigateur internet.<br><br><a href = '" + config.item.host + "confirmation?key=" + req.query.key + "&id=" + encrypt(req.query.mail) + "'>" + config.item.host + "confirmation?key=" + req.query.key + "&id=" + encrypt(req.query.mail) + "</a>"
          mail.mail(to, subject, text, html)
        }
      })
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