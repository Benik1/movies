import axios from 'axios';
import { endpoints } from '../constants';


const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 10000,
});

instance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('access_token');
    if(token) {
      request.headers.access_token = token;
    }
    return request
  }
)

instance.interceptors.response.use(
  (response) => response,
  (error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/sing-in';
    }
  })
)

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

const singUp = (data) => (
  instance.post(endpoints.SING_UP, data)
)

const getProfile = () => (
  instance.get(endpoints.PROFILE)
)

export default {
  singIn,
  singUp,
  getProfile,

  updateMovie,
  getAllMovies,
  getMoveById,
  deleteMovieById
}
