const express = require('express');
const { environment }  = require('./constants');
const {
  auth,
  login,
  addMovie,
  getAllMovies,
  getMovieById,
  deleteMovieById,
  updateMovieById,
} = require('./controllers');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/login', login);

app.use(auth);

app.post('/movies', addMovie);
app.get('/movies', getAllMovies);
app.get('/movies/:movieId', getMovieById);
app.put('/movies/:movieId', updateMovieById);
app.delete('/movies/:movieId', deleteMovieById);

app.use('*', function(req, res, next) {
  res.status(404).send('Not found');
})

app.listen(environment.PORT, async () => {
  console.log(`Example app listening on port ${environment.PORT}`);
  await sequelize.sync({ alter: true });
});
