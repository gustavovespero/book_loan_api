const DataTypes = require('sequelize');
const database = require('../database');

const Session = database.define('session', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.STRING
    //freezeTableName: true
})

module.exports = Session;