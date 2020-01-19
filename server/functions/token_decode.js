

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

exports.verifToken = verifToken;