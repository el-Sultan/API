/******************************* */
/***Import des module nécessaire */
const DB = require('../db.config')
const Contract = DB.Contract
const Company = DB.Company
// const User = DB.User

/******************************** */
/****Routage de la ressource Contrat */

/*********************************************** 1 : GET ; Voir la liste All Contract **************************************************** */
exports.getAllContracts = (req, res) => {
    Contract.findAll()
        .then(contracts => res.json({ data: contracts }))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données ALL-G: 1-1', error: err }))
}
/*********************************************** 2 : GET id : Voir par ID ************************************************* */

exports.getContract = async (req, res) => {
    let contractId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!contractId) {
        throw new RequestError('paramètre manquant contrat oneG : 2-1')
    }

    try {

        // Récupération d'un contract                                    , Voir pour les filtres  ------------>
        let contract = await Contract.findOne({ where: { id: contractId }, include: { model: Company, attributes: ['id', 'nom_de_lentreprise', 'numero_de_siret','code_ape', 'email'] } })

        //Test si résultat
        if ((contract === null)) {
            throw new ContractError('Ce contrat n\'existe pas ! oneG 2 -2')
        }

        //Renvoi du Contract trouvé
        return res.json({ data: contract })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données 3-4', error: err })
    }

}
/*********************************************** 3 : PUT : crée  **************************************************** */

exports.addContract = async (req, res) => {
    // const { civilite, nom,prenom, telephone, adresse, code_postal, ville, pays, type_de_contrat, date_de_debut,  motif, fonction, company_id, employee_id } = req.body
    const{  company_id, employee_id, civilite, nom, prenom, telephone, adresse, code_postal, ville, pays, type_de_contrat, date_de_debut, date_de_fin, periode_dessai, motif, fonction,}= req.body
    // validation des données reçues
    if (!company_id || !employee_id || !civilite || !nom ||!prenom || !telephone || !adresse || !code_postal || !ville || !pays || !type_de_contrat || !date_de_debut ||!date_de_fin ||!periode_dessai || !motif || !fonction) {
        return res.status(400).json({ message: 'Chant manquant dans ce formulaire  3-1' })
    }

    try {
        // Vérification si le contract existe
        let contract = await Contract.findOne({ where: { nom: nom }, raw: true })
        if (contract !== null) {
            return res.status(409).json({ message: `Le contrat ${nom} existe déjà ! P3-2` })
        }

        // Création du contract
        contract = await Contract.create(req.body)
        return res.json({ message: 'Contrat créé P3-3', data: contract })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données. P3-4', error: err })
    }

}
/*********************************************** 4 PATCH Update : mis à jour **************************************************** */

exports.updateContract = async (req, res) => {
    let contractId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!contractId) {
        return res.status(400).json({ message: 'Paramètre manquant. U 4-1  ' })
    }

    try {
        //Recherche contract et vérification 
        let contract = await Contract.findOne({ where: { id: contractId }, raw: true })
        if (contract === null) {
            return res.status(404).json({ message: 'Ce contrat n\'existe pas. U 4-2' })
        }

        // Mise à jour du contract 
        await Contract.update(req.body, { where: { id: contractId } })
        return res.json({ message: 'contrat mis à jour. U4-3' })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données. U4 - 4', error: err })
    }

}
/*********************************************** 5 POST : POUR RESTORE UN DELETE UNTRASH **************************************************** */

exports.untrashContract = (req, res) => {
    let contractId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!contractId) {
        return res.status(400).json({ message: 'Paramètre manquant. R5-1' })
    }
    Contract.restore({ where: { id: contractId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données. R5-2', error: err }))
}
/*********************************************** 6 Delete trash : poubelle en archive **************************************************** */

exports.trashContract = (req, res) => {
    let contractId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!contractId) {
        return res.status(400).json({ message: 'Paramètre manquant. D6-1' })
    }

    // Suppression d'un contract
    Contract.destroy({ where: { id: contractId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données. D6-2', error: err }))

}
/*********************************************** 7 Delete destroy - GAME OVER **************************************************** */

exports.deleteContract = (req, res) => {
    let contractId = parseInt(req.params.id)

    if (!contractId) {
        return res.status(400).json({ message: 'Paramètre manquant. Game OVER 7-1' })
    }

    // Suppression d'un Contract
    Contract.destroy({ where: { id: contractId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données. GEME OVER 7-2', error: err }))

}
