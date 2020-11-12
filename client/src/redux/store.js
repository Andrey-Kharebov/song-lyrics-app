import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import bandsReducer from './reducers/bands-reducer';

// const middlewares = [thunkMiddleware];
const middlewares = [thunkMiddleware, logger];

const reducers = combineReducers({
  bandsReducer
});

const store = createStore(reducers, applyMiddleware(...middlewares));

window.store = store;
export default store;
