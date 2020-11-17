import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducer from './walkingManager/reducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({ managerReducer: reducer });

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
