import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import userReducer from './user';
import movieReducer from './movie';
import moviesReducer from './movies';

const rootReducer = combineReducers({
  user: userReducer,
  movie: movieReducer,
  movies: moviesReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
