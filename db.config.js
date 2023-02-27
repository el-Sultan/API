/******************************** */
/**Import des modules nécessaires */
const { Sequelize } = require("sequelize");
const bcrypt = require('bcrypt');

/********************************** */
/*** Connexion à la base de données */
let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

/************************************************************************************************** */
/*** Mise en place des relations entre les "models" et  BDD "PostgreSQL" avec snycornisation auto   */
const db = {};
db.sequelize = sequelize;
db.User = require("./models/user")(sequelize);
db.Company = require("./models/companys")(sequelize);
db.Contract = require("./models/contracts")(sequelize);
db.Employee = require("./models/employees")(sequelize);

/*** Relation par clée étranger  entre comapny et contract*/
db.Company.hasMany(db.Contract, {
  foreignKey: "company_id",
  onDelete: "cascade",
});
db.Contract.belongsTo(db.Company, { foreignKey: "company_id" });

/*** Relation par clée étranger  entre company et employee*/
db.Company.hasMany(db.Employee, {
  foreignKey: "company_id",
  onDelete: "cascade",
});
db.Employee.belongsTo(db.Company, { foreignKey: "company_id" });

/*** Relation par clée étranger  entre  " Employee et Contract " afin de afficher les contrat disponible dans le profil employé*/
db.Employee.hasMany(db.Contract, {
  foreignKey: "employee_id",
  onDelete: "cascade",
});
db.Contract.belongsTo(db.Employee, { foreignKey: "employee_id" });

/******************************************************************** */
/*** Syncornisation avec la BDD avec Deux mode "Update" et "All Rest" */
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true })

/***************************** */
/*** Export de notre config db */
module.exports = db;
