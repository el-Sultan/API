/******************************* */
/***Import des module nécessaire */
const DB = require('../db.config')
const Employee = DB.Employee
const Company = DB.Company

/******************************** */
/****Routage de la ressource Contrat */

/*********************************************** 1 : GET ; Voir la liste All employees **************************************************** */
exports.getAllEmployees = (req, res) => {
    Employee.findAll()
        .then(employees => res.json({ data: employees }))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données ALL-G: 1-1', error: err }))
}
/*********************************************** 2 : GET id : Voir emplyee par ID ************************************************* */

exports.getEmployee = async (req, res) => {
    let employeeId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!employeeId) {
        throw new RequestError('paramètre manquant contrat oneG : 2-1')
    }

    try {

        // Récupération d'un employee                                    , Voir pour les filtres  ------------>
        let employee = await Employee.findOne({ where: { id: employeeId }, include: { model: Company, attributes: ['id', 'nom_de_lentreprise', 'numero_de_siret', 'code_ape', 'email'] } })

        //Test si résultat
        if ((employee === null)) {
            throw new EmployeeError('Cet employé n\'existe pas ! oneG 2 -2')
        }

        //Renvoi du employé trouvé
        return res.json({ data: employee })
    } catch (err) {
        console.log('dans le catch')
        console.log(err.message)
        console.log(err.statusCode);
        next(err)
    }

}
/*********************************************** 3 : PUT : crée  **************************************************** */
exports.addEmployee = async (req, res) => {
    const { civilite, nom, prenom, email, telephone, adresse,complement_adresse_1, code_postal, ville, pays, numero_de_ss, date_de_naissance, lieu_de_naissance, pays_de_naissance, poste, company_id } = req.body

    // validation des données reçues
    if (!civilite || !nom || !prenom || !email || !telephone || !adresse || !complement_adresse_1 || !code_postal || !ville || !pays || !numero_de_ss || !date_de_naissance || !lieu_de_naissance || !pays_de_naissance || !poste || !company_id) {
        return res.status(400).json({ message: 'Chant manquant dans ce formulaire  3-1' })
    }

    try {
        // Vérification si le employé existe
        let employee = await Employee.findOne({ where: { nom: nom }, raw: true })
        if (employee !== null) {
            return res.status(409).json({ message: `L'emplyé ${nom} existe déjà ! P3-2` })
        }

        // Création du employee
        employee = await Employee.create(req.body)
        return res.json({ message: 'un employé créé P3-3', data: employee })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données. P3-4', error: err })
    }

}
/*********************************************** 4 PATCH Update : mis à jour **************************************************** */

exports.updateEmployee = async (req, res) => {
    let employeeId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!employeeId) {
        return res.status(400).json({ message: 'Paramètre manquant. U 4-1  ' })
    }

    try {
        //Recherche l'employé et vérification 
        let employee = await Employee.findOne({ where: { id: employeeId }, raw: true })
        if (employee === null) {
            return res.status(404).json({ message: 'Cet employé n\'existe pas. U 4-2' })
        }

        // Mise à jour du profils 
        await Employee.update(req.body, { where: { id: employeeId } })
        return res.json({ message: 'Employé mis à jour. U4-3' })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur de la base de données. U4 - 4', error: err })
    }

}
/*********************************************** 5 POST : POUR RESTORE UN DELETE UNTRASH **************************************************** */

exports.untrashEmployee = (req, res) => {
    let employeeId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!employeeId) {
        return res.status(400).json({ message: 'Paramètre manquant. R5-1' })
    }
    Employee.restore({ where: { id: employeeId } })
        .then(() => res.status(204).json({message:'Le serveur a traité la demande avec succès 5-1.1'}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données. R5-2', error: err }))
}
/*********************************************** 6 Delete trash : poubelle en archive **************************************************** */

exports.trashEmployee = (req, res) => {
    let employeeId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!employeeId) {
        return res.status(400).json({ message: 'Paramètre manquant. D6-1' })
    }

    // Suppression d'un contract
    Employee.destroy({ where: { id: employeeId } })
        .then(() => res.status(204).json({message:'Le serveur a traité la demande avec succès 6-1.1'}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données. D6-3', error: err }))

}
/*********************************************** 7 Delete destroy - GAME OVER **************************************************** */

exports.deleteEmployee = (req, res) => {
    let employeeId = parseInt(req.params.id)

    if (!employeeId) {
        return res.status(400).json({ message: 'Paramètre manquant. Game OVER 7-1' })
    }

    // Suppression d'un employé
    Employee.destroy({ where: { id: employeeId }, force: true })
        .then(() => res.status(204).json({message:'Le serveur a traité la demande avec succès 7-1.1'}))
        .catch(err => res.status(500).json({ message: 'Erreur de la base de données. GEME OVER 7-2', error: err }))

}
