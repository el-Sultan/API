/******************************* */
/***Import des module nécessaire */
const DB = require('../db.config')
const Company = DB.Company

/******************************** */
/****Routage de la ressource Company */
/**************************************************** 1 : Get ALL Companys ******************************************************* */

exports.getAllCompanys = (req, res) => {
    Company.findAll()
        .then(Companys => res.json({ data: Companys }))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données 1-1', error: err }))
}
/**************************************************** 2 : Get user ******************************************************* */

exports.getCompany = async (req, res, next) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        throw new RequestError('missing parametre')
    }

    try {

        // Récupération d'un company
        let company = await Company.findOne({ where: { id: companyId }, attributes: ['id', 'nom_de_lentreprise', 'numero_de_siret','code_ape', 'email'] })

        //Test si résultat
        if ((company === null)) {
            throw new CompanyError('This company does not exit !')
        }

        //Renvoi du company trouvé
        return res.json({ data: company })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données 2-4', error: err })
    }

}
/**************************************************** 3 : Add user ******************************************************* */

exports.addCompany = async (req, res) => {
    const { numero_de_siret, nom_de_lentreprise, code_ape, raison_sociale, adresse, code_postal, ville, pays, civilite, nom, prenom, telephone, email, password } = req.body

    // Validation des données reçues
    if (!numero_de_siret || !nom_de_lentreprise || !code_ape || !raison_sociale || !adresse || !code_postal || !ville || !pays || !civilite || !nom || !prenom || !telephone || !email || !password) {
        return res.status(400).json({ message: 'Chant manquant dans ce formulaire  3-1' })
    }
    try {
        // Vérification si la company existe
        let company = await Company.findOne({ where: { nom_de_lentreprise: nom_de_lentreprise }, raw: true })
        if (company !== null) {
            return res.status(409).json({ message: `La société ${nom} existe déjà 3-2 !` })
        }

        // Création du company
        company = await Company.create(req.body)
        return res.json({ message: 'Société créée 3-3', data: company })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données 3-4', error: err })
    }

}

/**************************************************** 4 : Update User ******************************************************* */

exports.updateCompany = async (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parametre' })
    }

    try {
        //Recherche de company et vérification 
        let company = await Company.findOne({ where: { id: companyId }, raw: true })
        if (company === null) {
            return res.status(404).json({ message: ' This company does not exist' })
        }

        // Mise à jour de la company 
        await Company.update(req.body, { where: { id: companyId } })
        return res.json({ message: 'Company Updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }

}
/**************************************************** 6 : Réstoration de l'endreprise de corbeille vers le BDD ******************************************************* */

exports.untrashCompany = (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parametre' })
    }

    // réstoration de la company
    Company.restore({ where: { id: companyId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))

}
/**************************************************** 5 : Supprimer l'entreprise avec récupération ******************************************************* */

exports.trashCompany = (req, res) => {
    let companyId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!companyId) {
        return res.status(400).json({ message: 'Missing parametre' })
    }

    // Suppression de la company
    Company.destroy({ where: { id: companyId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))

}

/**************************************************** 7 : Supprimer de l'entreprise " GAME OVER " ******************************************************* */

exports.deleteCompany = (req, res) => {
    let companyId = parseInt(req.params.id)

    if (!companyId) {
        return res.status(400).json({ message: 'Missing parametre' })
    }

    // Suppression d'un cocktail
    Company.destroy({ where: { id: companyId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))

}
