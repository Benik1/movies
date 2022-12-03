const { DataTypes } = require('sequelize');

const User = require('./user');
const sequelize = require('../sequelize');

const Movie = sequelize.define('movies', {
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
    field: 'name'
  },
  thumbnailSrc: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'thumbnail_src'
  },
  trailerSrc: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'trailer_src'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description'
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'release_date'
  },
  rate: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
    field: 'rate'
  },
}, {});

User.hasMany(Movie);
Movie.belongsTo(User);

module.exports = Movie;
