/******************************* */
/***Import des module nécessaire */
const express = require('express')
const userCtrl = require('../controllers/user')

/************************************ */
/** Récupération du routeur d'express */
let router = express.Router()

/******************************************* */
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})

/*************************************** */
/*** Routage de la ressource Utilisateur */

/*********************************************** 1 : GET ; Voir la liste All USERs**************************************************** */
router.get('/', userCtrl.getAllUsers)

/*********************************************** 2 : GET id : Voir par ID************************************************* */
router.get('/:id', userCtrl.getUser)

/*********************************************** 3 : PUT : crée  **************************************************** */
router.put('', userCtrl.addUser)

/*********************************************** 4 PATCH : mis à jour **************************************************** */
router.patch('/:id', userCtrl.updateUser)

/*********************************************** 5 POST : POUR RESTORE UN DELETE UNTRASH **************************************************** */
router.post('/untrash/:id', userCtrl.untrashUser)

/*********************************************** 6 Delete trash **************************************************** */
router.delete('/trash/:id', userCtrl.trashUser)

/*********************************************** 7 Delete destroy **************************************************** */
router.delete('/:id', userCtrl.deleteUser)

module.exports = router 










