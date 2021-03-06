const DataTypes = require('sequelize');
const database = require('../database');
const Person = require('../model/Person');

const User = database.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Person.hasOne(User, {foreignKey: 'person_id', targetKey: 'id'});

User.belongsTo(Person,{
    constraint: true,
    foreignKey: 'person_id',
    targetKey: 'cpf'
})

module.exports = User;