import services from '../../services';

const initialState = {
  data: [],
  loading: false,
  deleteMovieLoading: false,
  updateMovieLoading: false
}

export const MOVIES_GET_ALL_MOVIES = 'movies/getAllMovies'
export const MOVIES_CHANGE_LOADING = 'movies/changeLoading';
export const MOVIES_CHANGE_MOVIES = 'movies/changeMovies';
export const MOVIES_ADD_MOVIE = 'movies/AddMovie';

export const MOVIES_DELETE_MOVIE = 'movies/moviesDeleteMovie';
export const MOVIES_CHANGE_DELETE_LOADING = 'movies/changeDeleteLoading';

export const MOVIES_UPDATE_MOVIE = 'movies/updateMovie';
export const MOVIES_CHANGE_UPDATE_LOADING = 'movies/changeUpdateLoading';

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIES_GET_ALL_MOVIES:
      return { ...state, data: action.payload }
    case MOVIES_CHANGE_LOADING:
      return { ...state, loading: action.payload }
    case MOVIES_CHANGE_MOVIES:
      return { ...state, data: action.payload }
    case MOVIES_ADD_MOVIE:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case MOVIES_CHANGE_DELETE_LOADING:
      return { ...state, deleteMovieLoading: action.payload }
    case MOVIES_DELETE_MOVIE:
      return { ...state, data: action.payload }
    case MOVIES_UPDATE_MOVIE:
      return { ...state, data: action.payload }
    case MOVIES_CHANGE_UPDATE_LOADING:
      return { ...state, updateMovieLoading: action.payload }
    default:
      return state
  }
}

const getAllMovies = () => {
  return dispatch => {
    dispatch({ type: MOVIES_CHANGE_LOADING, payload: true });
    services.getAllMovies()
      .then((response) => {
        const movies = response?.data?.movies || [];
        dispatch({
          type: MOVIES_GET_ALL_MOVIES,
          payload: movies
        })
      })
      .catch(() => {
        // :TODO
      })
      .finally(() => {
        dispatch({ type: MOVIES_CHANGE_LOADING, payload: false });
      })
  }
}

const updateMovieById = (id, body) => {
  return dispatch => {
    dispatch({ type: MOVIES_CHANGE_UPDATE_LOADING, payload: true });
    return services.updateMovie(id, body)
      .then((response) => {
        const movies = response?.data?.movies || [];
        dispatch({
          type: MOVIES_UPDATE_MOVIE,
          payload: movies
        })
        return Promise.resolve()
      })
      .catch(() => {
        // :TODO
        return Promise.reject()
      })
      .finally(() => {
        dispatch({ type: MOVIES_CHANGE_UPDATE_LOADING, payload: false });
      })
  }
}

const deleteMovieById = (id) => {
  return dispatch => {
    dispatch({ type: MOVIES_CHANGE_DELETE_LOADING, payload: true });
    services.deleteMovieById(id)
      .then((response) => {
        const movies = response?.data?.movies || [];
        dispatch({
          type: MOVIES_DELETE_MOVIE,
          payload: movies
        })
        return Promise.resolve()
      })
      .catch(() => {
        // :TODO
        return Promise.reject()
      })
      .finally(() => {
        dispatch({ type: MOVIES_CHANGE_DELETE_LOADING, payload: false });
      })
  }
}

const addMovie = (movie) => {
  return {
    type: MOVIES_ADD_MOVIE,
    payload: movie
  }
}


export { addMovie, getAllMovies, deleteMovieById, updateMovieById }

export default moviesReducer;
