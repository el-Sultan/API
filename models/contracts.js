/********************************* */
/*** Import des modules nécessaire */
const { DataTypes, Model } = require("sequelize");

/********************************* */
/*** définition du modèle Contract */

module.exports = (sequelize) => {
  return (Contract = sequelize.define(
    "Contract",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      type_de_contrat: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        required: true,
        validate: {
          len: [3, 3],
          isIn: [["CDI", "CDD"]],
        },
      },
      date_de_debut: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      date_de_fin: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
        // validate: {
        //   isAfter: "date_de_debut",
        //   checkContrat: function (value) {
        //     if (this.type_de_contrat === "CDD" && !value) {
        //       throw new Error(
        //         "La date de fin est obligatoire pour les contrats CDD"
        //       );
        //     }
        //   },
        // },
      },
      periode_dessai: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
        // validate: {
        //   checkContrat: function (value) {
        //     if (this.type_de_contrat === "CDI" && !value) {
        //       throw new Error(
        //         "La période de période_dessai est obligatoire pour les contrats CDI"
        //       );
        //     }
        //   },
        // },
      },
      motif: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          checkContrat: function (value) {
            if (this.type_de_contrat === "CDD" && !value) {
              throw new Error("Le motif est obligatoire pour les contrats CDD");
            }
          },
        },
      },
      fonction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
    },
    { paranoid: true }
  )); // Ici pour faire du softdele
};
