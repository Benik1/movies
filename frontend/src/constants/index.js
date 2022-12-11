export const endpoints = {
  SING_IN: '/sing-in',
  SING_UP: '/sing-up',
  MOVIES: '/movies',
  PROFILE: '/profile',
  MOVIE: (id) => `/movies/${id}`
}

export const routes = {
  Home: '/',
  singIn: '/sing-in',
  singUp: '/sing-up',
  movies: '/movies',
  movie: '/movies/:movieId',
  profile:'/profile'
}

export const actors = [
  'Scarlett Johansson',
  'Morgan Friman',
  'Leandro Dicaprio',
  'Margot Robbie',
  'Penelope Cruz',
  'Monica Bellucci',
  'Salma Hayek',
  'Angelina Jolie',
  'Kristian Bail',
  'Will Smith',
  'Johnny Depp',
]
