/********************************* */
/** Import des modules nécessaires */
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

/**************************** */
/** Définition du modèle User */

module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
                defaultValue: "",
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
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                required: true,
                unique: true,
                validate: {
                    isEmail: true, // Ici une validation de données
                },
            },
            // emailverified:{
            //     type: DataTypes.BOOLEAN,
            //     allowNull : false,
            //     defaultValue: false,
            // },    
            password: {
                type: DataTypes.STRING(64),
                is: /^[0-9a-f]{64}$/i,
            },
            ddn: {
                type: DataTypes.STRING,
                defaultValue: "",
                allowNull: false,
                required: true,
            },
        },
        { paranoid: true }
    ); //Ici pour faire du softDelete

    User.beforeCreate(async (user, options) => {
        let hash = await bcrypt.hash(
            user.password,
            parseInt(process.env.BCRYPT_SALT_ROUND)
        );
        user.password = hash;
    });

    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel);
    };

    return User;
};