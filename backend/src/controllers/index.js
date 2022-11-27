const jwt = require('jwt-simple')
const movies = require('./movie');

const users = [
  {
    id: 1,
    userName: 'Karen',
    password: 'karen123!'
  },
  {
    id: 2,
    userName: 'Benik',
    password: 'benik123!'
  }
]

const secret = 'secret-key';


const login = (req, res) => {
  const { userName, password } = req.body;
  const user = users.find((user) => {
    return user.userName === userName && user.password === password
  });
  if(user) {
    const payload = { id: user.id};
    const token = jwt.encode(payload, secret);
    res.json({ token });
  } else {
    res.status(401).send('Unauthorized')
  }
}


const auth = (req, res, next) =>{
  const access_token = req.headers.access_token;
  try {
    if(access_token) {
      const decoded = jwt.decode(access_token, secret);
      if(!decoded.id) {
        res.status(401).send('Unauthorized');
      }
      const user = users.find(user => {
        return user.id === decoded.id
      });

      if(user) {
        next();
      } else {
        res.status(401).send('Unauthorized');
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch(e) {
    res.status(401).send('Unauthorized');
  }
}

module.exports = {
  auth: auth,
  login: login,
  addMovie: movies.addMovie,
  getMovieById: movies.getMovieById,
  getAllMovies: movies.getAllMovies,
  deleteMovieById: movies.deleteMovieById,
  updateMovieById: movies.updateMovieById
}