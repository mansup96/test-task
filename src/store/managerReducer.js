import { api } from '../api/api';
import { getQueryFromObject, transformDate, transformDistance } from '../utils';

const SET_SORT_PARAMS = 'SET_SORT_PARAMS',
  SET_WALKS = 'SET_WALKS',
  SET_FETCHING = 'SET_FETCHING',
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SET_BADGE_MODE = 'SET_BATCH_MODE',
  SET_ACTIVE_WALK = 'SET_ACTIVE_WALK';

const initialState = {
  walks: [],
  sortParams: {
    _order: 'asc',
    _sort: 'date',
  },
  badge: {
    activeWalk: null,
    isOpen: false,
  },
  isFetching: false,
  errorMsg: null,
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_PARAMS:
      return {
        ...state,
        sortParams: { ...action.sortParams },
      };
    case SET_WALKS:
      return {
        ...state,
        walks: action.walks,
      };
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.value,
      };
    case SET_ERROR:
      return {
        ...state,
        errorMsg: action.value,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorMsg: null,
      };
    case SET_BADGE_MODE:
      return {
        ...state,
        badge: {
          ...state.badge,
          isOpen: action.isOpen,
        },
      };
    case SET_ACTIVE_WALK:
      return {
        ...state,
        badge: {
          ...state.badge,
          activeWalk: action.walk,
        },
      };
    default:
      return state;
  }
};

const setBadgeMode = isOpen => ({ type: SET_BADGE_MODE, isOpen });

const setActiveWalk = walk => ({ type: SET_ACTIVE_WALK, walk });

const setSortParams = ({ _sort, _order }) => ({
  type: SET_SORT_PARAMS,
  sortParams: { _sort, _order },
});

const setWalks = walks => ({ type: SET_WALKS, walks });

const setFetching = value => ({ type: SET_FETCHING, value });

const setError = value => ({ type: SET_ERROR, value });

const clearError = value => ({ type: CLEAR_ERROR, value });

const getWalks = () => async (dispatch, getState) => {
  dispatch(setFetching(true));
  const query = getQueryFromObject(getState().managerReducer.sortParams);

  await api
    .getWalks(query)
    .then(data => {
      const transformedData = data.map(transformDistance).map(transformDate);
      dispatch(setWalks(transformedData));
    })
    .catch(err => {
      // console.log(err);
      dispatch(setError('Ошибка'));
    });

  dispatch(setFetching(false));
};

export const fetchWalks = sortParams => dispatch => {
  if (sortParams) {
    dispatch(setSortParams(sortParams));
  }
  dispatch(getWalks());
};

export const handleBadge = (isOpen, id) => (dispatch, getState) => {
  if (id !== undefined) {
    const activeWalk = getState().managerReducer.walks.find(
      walk => walk.id === id
    );
    dispatch(setActiveWalk(JSON.parse(JSON.stringify(activeWalk)) || null));
  }

  dispatch(setBadgeMode(isOpen));
};

export default managerReducer;
