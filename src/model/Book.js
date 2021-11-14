const DataTypes = require('sequelize');
const database = require('../database');
const Loan_Book = require('./Loan_Book');
const Book_Author = require('./Book_Author');
const Author = require('./Author');
const Loan = require('./Loan');
const Session = require('./Session');

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
    description: DataTypes.STRING
})

Session.hasMany(Book, {foreignKey: 'session_id', targetKey: 'book_id'});

Book.belongsTo(Session,{
    constraint: true,
    foreignKey: 'session_id'
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

Book.belongsToMany(Author,{
    through: Book_Author,
    constraint: true,
    foreignKey: 'book_id'
})

Author.belongsToMany(Book,{
    through: Book_Author,
    constraint: true,
    foreignKey: 'author_id'
})

module.exports = Book;