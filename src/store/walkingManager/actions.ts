import {
  actionTypes,
  MappedWalk,
  ManagerStateTypes,
  SortParamsType,
  Walk,
} from './actionTypes';
import { getQueryFromObject } from '../../utils';
import { api } from '../../api/api';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../index';

const setBadgeMode = (isOpen: boolean) => ({
  type: actionTypes.set_batch_mode,
  isOpen,
});

const setActiveWalk = (
  walk: MappedWalk | null
): { type: string; walk: MappedWalk | null } => ({
  type: actionTypes.set_active_walk,
  walk,
});

const setActiveParam = (param: string) => ({
  type: actionTypes.set_active_param,
  param,
});

const setSortOrder = ({ param, order }: SortParamsType) => ({
  type: actionTypes.set_sort_order,
  param,
  order,
});

const setWalks = (walks: MappedWalk[]) => ({
  type: actionTypes.set_walks,
  walks,
});

const setFetching = (value: boolean) => ({
  type: actionTypes.set_fetching,
  value,
});

const setError = (value: string) => ({ type: actionTypes.set_error, value });

// eslint-disable-next-line no-unused-vars
const clearError = (value: any) => ({ type: actionTypes.clear_error, value });

const declOfNum = (number: number, words: string[]): string => {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
  ];
};

const getDistance = (distance: number): string => {
  const words = ['метр', 'метра', 'метров'];
  const meters = declOfNum(distance, words);
  if (distance < 1000) {
    return `${distance} ${meters}`;
  }
  if (distance % 1000 === 0) {
    return `${distance / 1000} км`;
  } else {
    return `${distance / 1000} км ${distance % 1000} ${meters}`;
  }
};

const getDay = (date: string): string => {
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  return days[new Date(date).getDay()];
};

const getMappedData = (data: Walk[]) => {
  return data.map(walk => ({
    ...walk,
    day: getDay(walk.date),
    transformedDistance: getDistance(walk.distance),
  }));
};

export const getWalks = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(setFetching(true));

  const sortParams = getState().managerReducer.sortParams;
  const activeParam = getState().managerReducer.activeParam;

  const params = {
    _sort: activeParam,
    _order: sortParams[activeParam].order,
  };

  const query = getQueryFromObject(params);

  await api
    .getWalks(query)
    .then((data: Walk[]) => {
      const mappedData: MappedWalk[] = getMappedData(data);
      dispatch(setWalks(mappedData));
    })
    .catch(err => {
      console.log(err);
      dispatch(setError('Ошибка'));
    });

  dispatch(setFetching(false));
};

export const changeWalksSort = (
  param: string
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  dispatch(setActiveParam(param));

  dispatch(getWalks());
};

export const changeWalksOrder = ({
  param,
  order,
}: SortParamsType): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => dispatch => {
  if (param && order) {
    dispatch(setSortOrder({ param, order }));
  }
  dispatch(getWalks());
};

export const handleBadge = (
  isOpen: boolean,
  id?: number | null
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
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

export const handleWalk = (
  walk: Walk,
  id?: number
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  if (id) {
    api.putWalk(walk, id).then(resp => {
      if (resp.id) {
        dispatch(getWalks());
      }
    });
  } else {
    api.postWalk(walk).then(resp => {
      console.log(resp);
      dispatch(getWalks());
    });
  }
};

export const removeWalk = (
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  if (id) {
    api.deleteWalk(id).then(resp => {
      dispatch(getWalks());
      dispatch(setBadgeMode(false));
    });
  }
};
