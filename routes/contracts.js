/******************************* */
/***Import des module nécessaire */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const contractCrtl = require('../controllers/contract')

/************************************ */
/** Récupération du routeur d'express */
let router = express.Router()

/******************************************* */
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Contract Time:', event.toString())
    next()
})

/*************************************** */
/*** Routage de la ressource Utilisateur */

/*********************************************** 1 : GET ; Voir la liste All **************************************************** */
router.get('/', contractCrtl.getAllContracts)

/*********************************************** 2 : GET id : Voir par ID************************************************* */
router.get('/:id', contractCrtl.getContract)

/*********************************************** 3 : PUT : crée  **************************************************** */
router.put('',  contractCrtl.addContract)

/*********************************************** 4 PATCH : mis à jour **************************************************** */
router.patch('/:id',  contractCrtl.updateContract)

/*********************************************** 5 POST : POUR RESTORE UN DELETE UNTRASH **************************************************** */
router.post('/untrash/:id',  contractCrtl.untrashContract)

/*********************************************** 6 Delete trash **************************************************** */
router.delete('/trash/:id',  contractCrtl.trashContract)

/*********************************************** 7 Delete destroy **************************************************** */
router.delete('/:id',  contractCrtl.deleteContract)

module.exports = router 










