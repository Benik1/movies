export const endpoints = {
  MOVIES: '/movies',
  MOVIE: (id) => `/movies/${id}`
}

export const routes = {
  Home: '/',
  movies: '/movies',
  movie: '/movies/:movieId'
}
