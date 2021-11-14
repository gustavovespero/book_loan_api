const DataTypes = require('sequelize');
const database = require('../database');

const Book_Author = database.define('book_author',{
    id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = Book_Author;