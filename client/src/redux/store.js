import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import bandsReducer from './reducers/bands-reducer';
import songsReducer from './reducers/songs-reducer';

const middlewares = [thunkMiddleware];
// const middlewares = [thunkMiddleware, logger];

const reducers = combineReducers({
  bandsReducer,
  songsReducer
});

const store = createStore(reducers, applyMiddleware(...middlewares));

window.store = store;
export default store;
