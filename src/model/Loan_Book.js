const DataTypes = require('sequelize');
const database = require('../database');

const Loan_Book = database.define('loan_book',{
    id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    freezeTableName: true
})

module.exports = Loan_Book;