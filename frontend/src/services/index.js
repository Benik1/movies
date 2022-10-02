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

export default {
  getAllMovies,
  getMoveById
}
