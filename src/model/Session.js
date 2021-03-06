const DataTypes = require('sequelize');
const database = require('../database');
const Book = require('./Book');

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

//Book.belongsTo(Session, {foreignKey: 'session_id', targetKey: 'book_id'});

module.exports = Session;