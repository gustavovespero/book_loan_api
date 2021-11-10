const DataTypes = require('sequelize');
const database = require('../database');
const Loan_Book = require('./Loan_Book');
const Session = require('./Session');
const Loan = require('./Loan');

const Book = database.define('book',{
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
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING
    //freezeTableName: true
})

Book.belongsTo(Session,{
    constraint: true,
    foreignKey: 'user_id'
})

Book.belongsToMany(Loan,{
    through: Loan_Book,
    constraint: true,
    foreignKey: 'book_id'
})

Loan.belongsToMany(Book,{
    through: Loan_Book,
    constraint: true,
    foreignKey: 'loan_id'
})

module.exports = Book;