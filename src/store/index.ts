import {
  createStore,
  combineReducers,
  applyMiddleware,
  Reducer,
  CombinedState,
} from 'redux';
import reducer from './walkingManager/reducer';
import thunkMiddleware from 'redux-thunk';
import { ManagerStateTypes } from './walkingManager/actionTypes';

export type RootState = { managerReducer: ManagerStateTypes };

const reducers: Reducer<CombinedState<RootState>> = combineReducers({
  managerReducer: reducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
