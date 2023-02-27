/******************************** */
/***Import des module nécessaire */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const DB = require('../db.config')
const User = DB.User
const Company = DB.Company

/******************************** */
/****Routage de la ressource Auth */
exports.login = async (req, res) => {
    const { email, password } = req.body

    //Validation des données reçues
    if (!email || !password) {
        return res.status(400).json({ message: 'Mauvais email ou mot de passe 1-1' })
    }

    try {
        // Vérification si l'utilisateur existe
        let user = await User.findOne({ where: { email: email }, raw: true })
        if (user === null) {
            // Vérification si la compagnie existe
            let company = await Company.findOne({ where: { email: email }, raw: true })
            if (company === null) {
                return res.status(401).json({ message: 'Ce compte n\'existe pas 1-2' })
            } else {
                // Vérification de mot de passe pour la compagnie
                let test = await bcrypt.compare(password, company.password)
                if (!test) {
                    return res.status(401).json({ message: 'Mauvais mot de passe 1-3' })
                }
                // Génération de token pour la compagnie
                const token = jwt.sign({
                    id: company.id,
                    nom: company.nom,
                    email: company.email
                }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

                return res.json({ access_token: token })
            }
        } else {
            // Vérification de mot de passe pour l'utilisateur
            let test = await User.checkPassword(password, user.password)
            if (!test) {
                return res.status(401).json({ message: 'Mauvais mot de passe 1-3' })
            }
            // Génération de token pour l'utilisateur
            const token = jwt.sign({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

            return res.json({ access_token: token })
        }

    } catch (err) {
        if (err.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Erreur de la base de données 1-4', error: err })
        }
        res.status(500).json({ message: 'Le processus de connexion a échoué 1-5', error: err })
    }
}

exports.generateCompanyToken = async (req, res) => {
    const { email, password } = req.body

    // Validation des données reçues
    if (!email || !password) {
        return res.status(400).json({ message: 'Mauvais email ou mot de passe 2-1' })
    }

    try {
        // Vérification si la compagnie existe
        let company = await Company.findOne({ where: { email: email }, raw: true })
        if (company === null) {
            return res.status(401).json({ message: 'Cette compagnie n\'existe pas 2-2' })
        }

        // Vérification de mot de passe pour la compagnie
        let test = await bcrypt.compare(password, company.password)
        if (!test) {
            return res.status(401).json({ message: 'Mauvais mot de passe 2-3' })
        }

        // Génération de token pour la compagnie
        const token = jwt.sign({
            id: company.id,
            nom: company.nom,
            email: company.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

        return res.json({ access_token: token })
    } catch (err) {
        if (err.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Erreur de la base de données 2-4', error: err })
        }
        res.status(500).json({ message: 'La génération du token pour la compagnie a échoué 2-5', error: err })
    }
}
