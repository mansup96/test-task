import {
  actionTypes,
  ChartRangeType,
  MappedWalk,
  SortParamsType,
  Walk,
} from './actionTypes';
import { api } from '../../api/api';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
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

const cleanWalks = () => ({ type: actionTypes.clean_walks });

const setWalks = (walks: MappedWalk[]) => ({
  type: actionTypes.set_walks,
  walks,
});

const setFetching = (value: boolean) => ({
  type: actionTypes.set_fetching,
  value,
});

const setTotalCount = (count: number) => ({
  type: actionTypes.set_total_count,
  count,
});

export const setPage = (page: number) => ({
  type: actionTypes.set_page,
  page,
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

const getDistance = (distance: number): [string, string] => {
  const words = ['метр', 'метра', 'метров'];
  const meters = declOfNum(distance, words);
  if (distance < 1000) {
    return [`${distance} ${meters}`, `${distance} м.`];
  } else if (distance % 1000 === 0) {
    return [`${distance / 1000} км`, `${distance / 1000} км`];
  } else {
    return [
      `${Math.trunc(distance / 1000)} км ${distance % 1000} ${meters}`,
      `${Math.trunc(distance / 1000)} км ${distance % 1000} м.`,
    ];
  }
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getMappedData = (data: Walk[]): MappedWalk[] => {
  return data.map(walk => {
    const date: Date = new Date(walk.date);
    return {
      ...walk,
      localeDate: date.toLocaleDateString('ru'),
      localeDay: capitalizeFirstLetter(
        date.toLocaleDateString('ru', { weekday: 'long' })
      ),
      transformedDistance: getDistance(walk.distance),
    };
  });
};

export const fetchWalks = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(setFetching(true));

  const { sortParams, activeParam } = getState().managerReducer;
  const { page, limit } = getState().managerReducer.paginationParams;

  const queryParams = {
    _sort: [activeParam, activeParam === 'date' ? 'distance' : 'date'],
    _order: [
      sortParams[activeParam].order,
      activeParam === 'date'
        ? sortParams['distance'].order
        : sortParams['date'].order,
    ],
    _page: page,
    _limit: limit,
  };

  await api
    .getWalks(queryParams)
    .then(resp => {
      const mappedData: MappedWalk[] = getMappedData(resp.data);
      dispatch(setWalks(mappedData));
      dispatch(setTotalCount(resp.totalCount));
    })
    .catch(err => {
      dispatch(setError('Ошибка'));
    });

  dispatch(setFetching(false));
};

export const changeWalksSort = (
  param: string
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  dispatch(setActiveParam(param));
  dispatch(reInitWalks());
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
    dispatch(reInitWalks());
  }
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

const reInitWalks = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => dispatch => {
  dispatch(setPage(1));
  dispatch(cleanWalks());
  dispatch(fetchWalks());
};

export const incrementPage = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => (dispatch, getState) => {
  const {
    page,
    limit,
    totalCount,
  } = getState().managerReducer.paginationParams;

  if (limit * page < totalCount) {
    dispatch(setPage(page + 1));
    dispatch(fetchWalks());
  }
};

const isInTheRange = (
  walk: Walk,
  getState: () => RootState,
  dispatch: ThunkDispatch<any, any, any>
) => {
  const [start, end] = getState().managerReducer.chartRange;

  if (
    start &&
    end &&
    new Date(walk.date).getTime() > start.getTime() &&
    new Date(walk.date).getTime() < end.getTime()
  ) {
    dispatch(getRangedWalks());
  }
};

export const handleWalk = (
  walk: Walk
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  walk.date = new Date(walk.date).toISOString();
  if (walk.id) {
    await api.putWalk(walk, walk.id);
  } else {
    await api.postWalk(walk).then(resp => {});
  }
  dispatch(setActiveWalk(null));
  dispatch(reInitWalks());
  dispatch(setBadgeMode(false));
  isInTheRange(walk, getState, dispatch);
};

export const removeWalk = (
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  if (id) {
    const walk = getState().managerReducer.walks.find(walk => walk.id === id);
    if (walk) {
      await api.deleteWalk(id);
      dispatch(reInitWalks());
      dispatch(setBadgeMode(false));
      isInTheRange(walk, getState, dispatch);
    }
  }
};

const setRangedWalks = (walks: Walk[]) => ({
  type: actionTypes.set_rangedWalks,
  walks,
});

const setChartRange = (chartRange: ChartRangeType) => ({
  type: actionTypes.set_range,
  chartRange,
});

export const changeChartRange = (
  chartRange: ChartRangeType
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(setChartRange(chartRange));
  dispatch(getRangedWalks());
};

export const getRangedWalks = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  const [start, end] = getState().managerReducer.chartRange;
  if (start && end) {
    const range = {
      date_gte: start.toISOString(),
      date_lte: end.toISOString(),
      _sort: 'date',
      _order: 'asc',
    };

    const rangedWalks = await api.getRangedWalks(range);
    dispatch(setRangedWalks(getMappedData(rangedWalks)));
  }
};
