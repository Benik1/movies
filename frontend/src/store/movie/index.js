import services from '../../services';

const initialState = {
  data: null,
  loading: false,
}

export const MOVIE_GET_MOVIE_DATA = 'movie/getMovieData';
export const MOVIE_CHANGE_LOADING = 'movie/changeLoading';
export const MOVIE_RESET = 'movie/reset';
export const MOVIE_UPDATE_MOVIE = 'movie/updateMovie';

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIE_GET_MOVIE_DATA:
      return { ...state, data: action.payload }
    case MOVIE_CHANGE_LOADING:
      return { ...state, loading: action.payload }
    case MOVIE_UPDATE_MOVIE:
      return { ...state, data: action.payload }
    case MOVIE_RESET:
      return initialState;
    default:
      return state
  }
}

const updateMovie = (id, data) => {
  return dispatch => {
    return (
      services.updateMovie(id, data)
        .then((response) => {
          dispatch({
            type: MOVIE_UPDATE_MOVIE,
            payload: response.data || null
          })
        })
    )
  }
}

const getMovieData = (movieId) => {
  return dispatch => {
    dispatch({ type: MOVIE_CHANGE_LOADING, payload: true });
    services.getMoveById(movieId)
      .then((response) => {
        const movie = response?.data || null;
        dispatch({
          type: MOVIE_GET_MOVIE_DATA,
          payload: movie
        })
      })
      .catch(() => {
        // :TODO
      })
      .finally(() => {
        dispatch({ type: MOVIE_CHANGE_LOADING, payload: false });
      })
  }
}

const resetMoveData = () => {
  return {
    type: MOVIE_RESET
  }
}

export { getMovieData, resetMoveData, updateMovie }

export default movieReducer;
