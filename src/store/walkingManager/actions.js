import types from './actionTypes';
import {
  getQueryFromObject,
  transformDate,
  transformDistance,
} from '../../utils';
import { api } from '../../api/api';

const setBadgeMode = isOpen => ({ type: types.set_batch_mode, isOpen });

const setActiveWalk = walk => ({ type: types.set_active_walk, walk });

const setActiveParam = param => ({ type: types.set_active_param, param });

const setSortOrder = ({ param, order }) => ({
  type: types.set_sort_order,
  param,
  order,
});

const setWalks = walks => ({ type: types.set_walks, walks });

const setFetching = value => ({ type: types.set_fetching, value });

const setError = value => ({ type: types.set_error, value });

// eslint-disable-next-line no-unused-vars
const clearError = value => ({ type: types.clear_error, value });

export const getWalks = () => async (dispatch, getState) => {
  dispatch(setFetching(true));

  const sortParams = getState().managerReducer.sortParams;
  const activeParam = sortParams.activeParam;

  const params = {
    _sort: activeParam,
    _order: sortParams[activeParam].order,
  };

  const query = getQueryFromObject(params);

  await api
    .getWalks(query)
    .then(data => {
      const transformedData = data.map(transformDistance).map(transformDate);
      dispatch(setWalks(transformedData));
    })
    .catch(err => {
      console.log(err);
      dispatch(setError('Ошибка'));
    });

  dispatch(setFetching(false));
};

export const changeWalksSort = param => dispatch => {
  dispatch(setActiveParam(param));

  dispatch(getWalks());
};

export const changeWalksOrder = ({ param, order }) => dispatch => {
  console.log({ param, order })
  if (param && order) {
    dispatch(setSortOrder({ param, order }));
  }
  dispatch(getWalks());
};

export const handleBadge = (isOpen, id) => (dispatch, getState) => {
  if (id !== undefined) {
    const activeWalk = getState().managerReducer.walks.find(
      walk => walk.id === id
    );
    if (activeWalk) {
      dispatch(setActiveWalk(JSON.parse(JSON.stringify(activeWalk))));
    } else {
      dispatch(setActiveWalk(null));
    }
  }

  dispatch(setBadgeMode(isOpen));
};

export const handleWalk = (walk, id) => dispatch => {
  if (id) {
    api.putWalk(walk, id).then(resp => {
      dispatch(getWalks());
    });
  } else {
    api.postWalk(walk).then(resp => {
      console.log(resp);
      dispatch(getWalks());
    });
  }
};

export const removeWalk = id => dispatch => {
  if (id) {
    api.deleteWalk(id).then(resp => {
      dispatch(getWalks());
      dispatch(setBadgeMode(false));
    });
  }
};
