import axios from 'axios';
import { endpoints } from '../constants';


const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 10000,
});

const getAllMovies = () => (
  instance.get(endpoints.MOVIES)
)

const getMoveById = (id) => (
  instance.get(endpoints.MOVIE(id))
)

const deleteMovieById = (id) => (
  instance.delete(endpoints.MOVIE(id))
)

const updateMovie = (id, data) => (
  instance.put(endpoints.MOVIE(id), data)
)

const singIn = (data) => (
  instance.post(endpoints.SING_IN, data)
)


export default {
  singIn,

  updateMovie,
  getAllMovies,
  getMoveById,
  deleteMovieById
}
