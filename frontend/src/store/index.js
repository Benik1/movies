import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import userReducer from './user';
import moviesReducer from './movies';

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
