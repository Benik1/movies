import services from '../../services';

const initialState = {
  data: [],
  loading: false,
}

export const MOVIES_GET_ALL_MOVIES = 'movies/getAllMovies'
export const MOVIES_CHANGE_LOADING = 'movies/changeLoading';
export const MOVIES_CHANGE_MOVIES = 'movies/changeMovies';
export const MOVIES_ADD_MOVIE = 'movies/AddMovie';

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
        data: [ ...state.data, action.payload ]
      }
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

const addMovie = (movie) => {
  return {
    type: MOVIES_ADD_MOVIE,
    payload: movie
  }
}


export { addMovie, getAllMovies }

export default moviesReducer;
