/*********************************** */
/***  Import des modules nécessaires */
const express = require("express");
const cors = require("cors");
const checkTokenMiddleware = require('./jsonwebtoken/check');

/************************************ */
/*** Import de la connection a la DB */
let DB = require("./db.config");

/*************************** */
/*** Initialisation de l'API */
const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/************************************************** */
/*** Import des modules de routage ******************/

const user_router = require('./routes/users');
const companys_router = require('./routes/companys');
const contrats_router = require('./routes/contracts');
const employees_router = require('./routes/employees');

/************************************************** */
/*** Import des modules de routage pour les TOKTOK ***/
const auth_router = require('./routes/auths');

/************************************************** */
/** Mise en place du routage ************************/
app.get("/", (req, res) => res.send(` Je suis en ligne. Tout est OK ! `));

// Utilisation du checkTokenMiddleware pour la route "/companys"
app.use('/companys', checkTokenMiddleware, companys_router);
app.use('/contracts', contrats_router);
app.use('/employees', employees_router);
app.use("/users", checkTokenMiddleware, user_router); 
// app.use("/users", user_router) //! Si un pb avec le tokenc on bypass avec le'checkTokenMiddleware,' en mode Dauof !!! 

/****************************************************/
/*** Mise en place routage auth user + company ******/
app.use('/auth', auth_router);
// app.use('/authC', authC_router);

app.get("*", (req, res) =>
    res.status(501).send("Qu'est-ce que tu ............. * !?!")
);

app.use((error, req, res, next) => {
    console.log('je suis dans le middleware');
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message, error: error });
});

/**************************************************** */
/*** Start serveur avec test DB ***********************/
DB.sequelize.authenticate()
    .then(() => console.log("Connexion à la base de données OK"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun!`);
        });
    })
    .catch((err) => console.log("Database Error"));
