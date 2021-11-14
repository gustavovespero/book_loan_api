const DataTypes = require('sequelize');
const database = require('../database');

const Person = database.define('person',{
    cpf: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: DataTypes.DATEONLY
    //freezeTableName: true
})

module.exports = Person;