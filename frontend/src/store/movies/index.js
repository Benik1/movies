


const initialState = {
  data: [],
  loading: false,
}

export const MOVIES_CHANGE_LOADING = 'movies/changeLoading';
export const MOVIES_CHANGE_MOVIES = 'movies/changeMovies';
export const MOVIES_ADD_MOVIE = 'movies/AddMovie';

function moviesReducer(state = initialState, action) {
  switch (action.type) {
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

export default moviesReducer;
