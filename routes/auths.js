/************************************* */
/*** Import des modules nécessaires ***/
const express = require('express');
const authCtrl = require('../controllers/auth'); // Import du contrôleur pour la ressource "auth"

/************************************ */
/*** Récupération du routeur d'Express */
let router = express.Router();

/******************************************* */
/*** Middleware pour logger dates de requête */
router.use((req, res, next) => {
    const event = new Date();
    console.log('AUTH Time:', event.toString());
    next();
});

/******************************** */
/*** Routage de la ressource Auth */
router.post('/login', authCtrl.login);

/*********************************************** */
/*** Export du routeur pour utilisation dans l'app */
module.exports = router;
