/********************************* */
/*** Import des modules nécessaire */
const { DataTypes } = require("sequelize");

/********************************* */
/*** définition du modèle Contract */

module.exports = (sequelize) => {
    const Employee = sequelize.define(
        "Employee",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                required: true,
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
            // nom_jeune_fille: {
            //     type: DataTypes.STRING,
            //     allowNull: true,
            //     isNull: true,
            // },
            prenom: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: false,
                required: true,
                validate: {
                    len: [3, 100],
                },
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
            numero_de_ss: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: false,
                required: true,
                validate: {
                    is: /^\d{13}$/,
                },
            },
            date_de_naissance: {
                type: DataTypes.DATE,
                allowNull: false,
                required: true,
                validate: {
                    isDate: true,
                },
            },
            lieu_de_naissance: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true,
                validate: {
                    // isAlpha: true,
                    len: [3, 250],
                },
            },
            pays_de_naissance: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true,
                validate: {
                    // isAlpha: true,
                    len: [3, 250],
                },
            },
            poste: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true,
                validate: {
                    // isAlpha: true,
                    len: [3, 250],
                },
            },
        },
        { paranoid: true }
    ); // Ici pour faire du softdele

    return Employee;
};