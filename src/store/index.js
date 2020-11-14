import { createStore, combineReducers, applyMiddleware } from 'redux';
import managerReducer from './managerReducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({ managerReducer });

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
