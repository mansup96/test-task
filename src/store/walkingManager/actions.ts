import {
  types,
  ChartRangeType,
  CreatedWalk,
  SortParamsType,
  Walk,
} from './types';
import { api } from '../../api/api';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../index';
import { isInTheRange } from '../utils';

export const setBadgeMode = (isOpen: boolean) => ({
  type: types.set_batch_mode,
  isOpen,
});

const setSelectedWalk = (
  walk: Walk | null
): { type: string; walk: Walk | null } => ({
  type: types.set_selected_walk,
  walk,
});

const setActiveParam = (param: string) => ({
  type: types.set_active_param,
  param,
});

const setSortOrder = ({ param, order }: SortParamsType) => ({
  type: types.set_sort_order,
  param,
  order,
});

const cleanWalks = () => ({ type: types.clean_walks });

const setWalks = (walks: Walk[]) => ({
  type: types.set_walks,
  walks,
});

const setFetching = (value: boolean) => ({
  type: types.set_fetching,
  value,
});

const setTotalCount = (count: number) => ({
  type: types.set_total_count,
  count,
});

export const setPage = (page: number) => ({
  type: types.set_page,
  page,
});

const setError = (value: string) => ({ type: types.set_error, value });

// eslint-disable-next-line no-unused-vars
const clearError = (value: any) => ({ type: types.clear_error, value });

export const fetchWalks = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(setFetching(true));

  const { sortParams, activeSortParam } = getState().managerReducer;
  const { page, limit } = getState().managerReducer.paginationParams;

  const queryParams = {
    _sort: [activeSortParam, activeSortParam === 'date' ? 'distance' : 'date'],
    _order: [
      sortParams[activeSortParam].order,
      activeSortParam === 'date'
        ? sortParams['distance'].order
        : sortParams['date'].order,
    ],
    _page: page,
    _limit: limit,
  };
  try {
    const respFromApi = await api.getWalks(queryParams);

    dispatch(setWalks(respFromApi.data));
    dispatch(setTotalCount(respFromApi.totalCount));
  } catch (err) {
    dispatch(setError('Ошибка'));
  }

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

export const handleBadgeAction = (
  id: number | null,
  from: 'table' | 'chart' = 'table'
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
  if (id) {
    const selectedWalk =
      from === 'table'
        ? getState().managerReducer.walks.find(walk => walk.id === id)
        : getState().managerReducer.rangedWalks.find(walk => walk.id === id);
    if (selectedWalk) {
      dispatch(setSelectedWalk(selectedWalk));
    } else {
      throw Error('Ошибка синхронизации прогулок');
    }
  } else {
    dispatch(setSelectedWalk(null));
  }
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

export const handleWalkAction = (
  walk: Walk | CreatedWalk
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  walk.date = new Date(walk.date).toISOString();
  if (walk.id !== null) {
    await api.putWalk(walk);
  } else {
    await api.postWalk(walk);
  }
  dispatch(setSelectedWalk(null));
  dispatch(reInitWalks());
  dispatch(setBadgeMode(false));
  if (isInTheRange(walk, getState)) {
    dispatch(getRangedWalks());
  }
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
      if (isInTheRange(walk, getState)) {
        dispatch(getRangedWalks());
      }
    }
  }
};

const setRangedWalks = (walks: Walk[]) => ({
  type: types.set_rangedWalks,
  walks,
});

const setChartRange = (chartRange: ChartRangeType) => ({
  type: types.set_range,
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
    dispatch(setRangedWalks(rangedWalks));
  }
};
