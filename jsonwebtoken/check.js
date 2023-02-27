/********************************* */
/*** Import des module nécessaires */

const jwt = require('jsonwebtoken')

/*********************** */
/*** Extraction du token */
const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false
    }

    //On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]
}

/**************************************** */
/*** Vérification de la présence du token */
const checkTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'PA de TOK-TOK!!!' })
    }

    //  Vérifier la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Mauvais jeton !!!' })
        }

        next()
    })
}

module.exports = checkTokenMiddleware

