const jwt = require('jwt-simple')
const movies = require('./movie');
const userControllers = require('./user');

module.exports = {
  addMovie: movies.addMovie,
  getMovieById: movies.getMovieById,
  getAllMovies: movies.getAllMovies,
  deleteMovieById: movies.deleteMovieById,
  updateMovieById: movies.updateMovieById,

  auth: userControllers.auth,
  singUp: userControllers.singUp,
  singIn: userControllers.singIn,
}