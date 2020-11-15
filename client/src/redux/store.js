import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import bandsReducer from './reducers/bands-reducer';
import songsReducer from './reducers/songs-reducer';
import lyricsReducer from './reducers/lyrics-reducer';

const middlewares = [thunkMiddleware];
// const middlewares = [thunkMiddleware, logger];

const reducers = combineReducers({
  bandsReducer,
  songsReducer,
  lyricsReducer
});

const store = createStore(reducers, applyMiddleware(...middlewares));

window.store = store;
export default store;
