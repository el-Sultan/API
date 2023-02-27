/******************************* */
/***Import des module nécessaire */
const bcrypt = require('bcrypt')
const DB = require('../db.config')
const User = DB.User


// const User = require('../models/user')

/**********************************/
/*** Routage de la ressource User */
/**************************************************** 1 : Get ALL user ******************************************************* */
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données sur 1-1 ', error: err }))
}

/**************************************************** 2 : Get user ******************************************************* */
exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.json(400).json({ message: 'Paramètre manquant 2-1' })
    }

    try {
        // Récupération de l'utilisateur et vérification
        let user = await User.findOne({ where: { id: userId }, attributes: ['id', 'nom', 'email'] })
        if (user === null) {
            return res.status(404).json({ message: 'Cet utilisateur n\'existe pas ! 2-2' })
        }

        return res.json({ data: user })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données 2-3', error: err })
    }
}
/**************************************************** 3 : Add user ******************************************************* */
exports.addUser = async (req, res) => {
    const { civilite, nom, prenom, telephone, adresse, code_postal, ville, pays, email, password } = req.body

    // Validation des données reçues
    if (!civilite || !nom || !prenom || !telephone || !adresse || !code_postal || !ville || !pays || !email || !password) {
        return res.status(400).json({ message: 'Chant manquant dans ce formulaire  3-1' })
    }

    try {
        // Vérification si l'utilisateur existe déjà
        const user = await User.findOne({ where: { email: email }, raw: true })
        if (user !== null) {
            return res.status(409).json({ message: `L'utilisateur ${nom} existe déjà! 3-2` })
        }

        // Céation de l'utilisateur
        let userc = await User.create(req.body)
        return res.json({ message: 'Utilisateur créé 3-3', data: userc })

    } catch (err) {
        if (err.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Erreur de la base de données 3-4', error: err })
        }
        res.status(500).json({ message: 'Erreur de processus de hachage 3-5', error: err })
    }
}
/**************************************************** 4 : Update User ******************************************************* */

exports.updateUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Paramètre manquant 4-1' })
    }

    try {
        // Recherche de l'utilisateur et vérification
        let user = await User.findOne({ where: { id: userId }, raw: true })
        if (user === null) {
            return res.status(404).json({ message: 'Cet utilisateur n\'existe pas ! 4-2' })
        }

        // Mise à jour de l'utilisateur
        await User.update(req.body, { where: { id: userId } })
        return res.json({ message: 'Utilisateur mis à jour 4-3' })
    } catch (err) {
        return res.status(500).json({ message: 'Paramètre manquant 4-4', error: err })
    }
}
/**************************************************** 5 : Supprimer l'utilisateur avec récupération ******************************************************* */

exports.untrashUser = (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Paramètre manquant 5-1' })
    }

    User.restore({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données 5-2', error: err }))
}
/**************************************************** 6 : utilisateur de la corbeille ******************************************************* */

exports.trashUser = (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Paramètre manquant 6-1' })
    }

    // Suppression de l'utilisateur
    User.destroy({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données 5-2', error: err }))
}
/**************************************************** 7 : Supprimer l'utilisateur " GAME OVER"  ******************************************************* */

exports.deleteUser = (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Paramètre manquant 7-1' })
    }

    // Suppression de l'utilisateur
    User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données 7-2', error: err }))
}