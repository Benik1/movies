const express = require('express');
const { environment, endpoints }  = require('./constants');
const {
  addMovie,
  getAllMovies,
  getMovieById,
  deleteMovieById,
  updateMovieById
} = require('./controllers');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.get(endpoints.MOVIES, getAllMovies);
app.get(endpoints.MOVIE, getMovieById);
app.post(endpoints.MOVIES, addMovie);
app.delete(endpoints.MOVIE, deleteMovieById);
app.put(endpoints.MOVIE, updateMovieById);


app.listen(environment.PORT, () => {
  console.log(`Example app listening on port ${environment.PORT}`)
})
