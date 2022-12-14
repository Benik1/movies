import services from "../../services";

const initialState = {
  data: [],
  loading: false,
  deleteMovieLoading: false,
  updateMovieLoading: false,
};

export const MOVIES_GET_ALL_MOVIES = "movies/getAllMovies";
export const MOVIES_CHANGE_GET_LOADING = "movies/moviesGetMovie";

export const MOVIES_ADD_MOVIE = "movies/AddMovie";
export const MOVIES_CHANGE_ADD_LOADING = "movies/moviesAddMovie";

export const MOVIES_DELETE_MOVIE = "movies/moviesDeleteMovie";
export const MOVIES_CHANGE_DELETE_LOADING = "movies/changeDeleteLoading";

export const MOVIES_UPDATE_MOVIE = "movies/updateMovie";
export const MOVIES_CHANGE_UPDATE_LOADING = "movies/changeUpdateLoading";

export const RESET_MOVIES = "movies/resetMovies";

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIES_GET_ALL_MOVIES:
      return { ...state, data: action.payload };
    case MOVIES_CHANGE_GET_LOADING:
      return { ...state, loading: action.payload };

    case MOVIES_ADD_MOVIE:
      return { ...state, data: [...state.data, action.payload] };

    case MOVIES_DELETE_MOVIE:
      return { ...state, data: action.payload };
    case MOVIES_CHANGE_DELETE_LOADING:
      return { ...state, deleteMovieLoading: action.payload };

    case MOVIES_UPDATE_MOVIE:
      return {
        ...state,
        data: state.data.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case MOVIES_CHANGE_UPDATE_LOADING:
      return { ...state, updateMovieLoading: action.payload };

    case RESET_MOVIES:
      return initialState;
    default:
      return state;
  }
}

const getAllMovies = () => {
  return (dispatch) => {
    dispatch({ type: MOVIES_CHANGE_GET_LOADING, payload: true });
    services
      .getAllMovies()
      .then((response) => {
        const movies = response?.data || [];
        dispatch({
          type: MOVIES_GET_ALL_MOVIES,
          payload: movies,
        });
      })
      .catch(() => {
        // :TODO
      })
      .finally(() => {
        dispatch({ type: MOVIES_CHANGE_GET_LOADING, payload: false });
      });
  };
};

const updateMovieById = (id, body) => {
  return (dispatch) => {
    dispatch({ type: MOVIES_CHANGE_UPDATE_LOADING, payload: true });
    return services
      .updateMovie(id, body)
      .then((response) => {
        dispatch({
          type: MOVIES_UPDATE_MOVIE,
          payload: response?.data || null,
        });
        return Promise.resolve();
      })
      .catch(() => {
        // :TODO
        return Promise.reject();
      })
      .finally(() => {
        dispatch({ type: MOVIES_CHANGE_UPDATE_LOADING, payload: false });
      });
  };
};

const deleteMovieById = (id) => {
  return (dispatch) => {
    dispatch({ type: MOVIES_CHANGE_DELETE_LOADING, payload: true });
    services
      .deleteMovieById(id)
      .then((response) => {
        const movies = response?.data || [];
        dispatch({
          type: MOVIES_DELETE_MOVIE,
          payload: movies,
        });
        return Promise.resolve();
      })
      .catch(() => {
        // :TODO
        return Promise.reject();
      })
      .finally(() => {
        dispatch({ type: MOVIES_CHANGE_DELETE_LOADING, payload: false });
      });
  };
};

const addMovie = (movie) => {
  return (dispatch) => {
    return services
      .createMovie(movie)
      .then((response) => {
        const movie = response?.data || null;
        dispatch({
          type: MOVIES_ADD_MOVIE,
          payload: movie,
        });
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };
};

const resetMovies = () => ({
  type: RESET_MOVIES,
});

export {
  addMovie,
  getAllMovies,
  deleteMovieById,
  updateMovieById,
  resetMovies,
};

export default moviesReducer;
