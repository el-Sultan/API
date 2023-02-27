/********************************* */
/*** Import des modules nécessaire */
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

/***************************** */
/*** définition du modèle Entreprise */

module.exports = (sequelize) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numero_de_siret: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          is: /^\d{14}$/,
        },
      },
      nom_de_lentreprise: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
      },
      code_ape: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
        required: true,
        validate: {
          len: [5, 5],
        },
      },
      raison_sociale: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
      },
      adresse: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          len: [5, 250],
        },
      },
      complement_adresse_1: {
        type: DataTypes.STRING,
        allowNull: true,
        isNull: true,
      },
      code_postal: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          len: [5, 5],
        },
      },
      ville: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          len: [3, 100],
        },
      },
      pays: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          len: [3, 100],
        },
      },
      civilite: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          len: [1, 3],
          isIn: [["Mr", "Mme"]],
        },
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: [3, 100],
        },
      },
      prenom: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          len: [3, 100],
        },
      },
      telephone: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          is: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
        },
      },
      complement_adresse_2: {
        type: DataTypes.STRING,
        allowNull: true,
        isNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
        unique: true,
        validate: {
          isEmail: true, // Ici une validation de données
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: true,
        required: true,
        is: /^[0-9a-f]{64}$/i, //Ici une contrainte
      },
    },
    { paranoid: true }
  ); //Ici pour faire du softDelete

  Company.beforeCreate(async (Company, options) => {
    let hash = await bcrypt.hash(
      Company.password,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    Company.password = hash;
  });

  Company.checkPassword = async (password, originel) => {
    return await bcrypt.compare(password, originel);
  };

  return Company;
};
