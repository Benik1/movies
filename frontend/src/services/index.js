import axios from 'axios';
import { endpoints } from '../constants';


const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 10000,
});

const getAllMovies = () => (
  instance.get(endpoints.MOVIES)
)

export default {
  getAllMovies
}
