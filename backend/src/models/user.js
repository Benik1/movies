const { DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'last_name'
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    field: 'email'
  },
  passwordHash: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'password_hash',
  }
});

module.exports = User;
