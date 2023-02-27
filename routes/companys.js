/******************************* */
/***Import des module nécessaire */

const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const companyCrtl = require('../controllers/company')

/************************************ */
/** Récupération du routeur d'express */
let router = express.Router()

/******************************************* */
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Company Time:', event.toString())
    next()
})

/******************************** */
/****Routage de la ressource Company */
/*********************************************** 1 : GET ; Voir la liste All companys**************************************************** */
router.get('', companyCrtl.getAllCompanys)

/*********************************************** 2 : GET id : Voir par ID ************************************************* */
router.get('/:id', companyCrtl.getCompany)

/*********************************************** 3 : PUT : crée  **************************************************** */
router.put('', companyCrtl.addCompany)

/*********************************************** 4 PATCH : mis à jour **************************************************** */
router.patch('/:id', companyCrtl.updateCompany)

/*********************************************** 5 POST : POUR RESTORE UN DELETE UNTRASH **************************************************** */
router.post('/untrash/:id', companyCrtl.untrashCompany)

/*********************************************** 6 Delete trash **************************************************** */
router.delete('/trash/:id', companyCrtl.trashCompany)

/*********************************************** 7 Delete destroy **************************************************** */
router.delete('/:id', companyCrtl.deleteCompany)

module.exports = router