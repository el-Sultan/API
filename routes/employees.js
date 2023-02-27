/******************************* */
/***Import des module nécessaire */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const employeeCrtl = require('../controllers/employee')

/************************************ */
/** Récupération du routeur d'express */
let router = express.Router()

/******************************************* */
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Employee Time:', event.toString())
    next()
})

/*************************************** */
/*** Routage de la ressource Utilisateur */

/*********************************************** 1 : GET ; Voir la liste All **************************************************** */
router.get('/', employeeCrtl.getAllEmployees)

/*********************************************** 2 : GET id : Voir par ID************************************************* */
router.get('/:id', employeeCrtl.getEmployee)

/*********************************************** 3 : PUT : crée  **************************************************** */
router.put('', employeeCrtl.addEmployee)

/*********************************************** 4 PATCH : mis à jour **************************************************** */
router.patch('/:id', employeeCrtl.updateEmployee)

/*********************************************** 5 POST : POUR RESTORE UN DELETE UNTRASH **************************************************** */
router.post('/untrash/:id', employeeCrtl.untrashEmployee)

/*********************************************** 6 Delete trash **************************************************** */
router.delete('/trash/:id', employeeCrtl.trashEmployee)

/*********************************************** 7 Delete destroy **************************************************** */
router.delete('/:id', employeeCrtl.deleteEmployee)

module.exports = router 