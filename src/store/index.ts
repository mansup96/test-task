import {
  createStore,
  combineReducers,
  applyMiddleware,
  Reducer,
  CombinedState,
  compose,
} from 'redux';
import managerReducer from './walkingManager/reducer';
import thunkMiddleware from 'redux-thunk';
import { ManagerStateTypes } from './walkingManager/types';

export type RootState = {
  managerReducer: ManagerStateTypes;
};

const reducers: Reducer<CombinedState<RootState>> = combineReducers({
  managerReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
