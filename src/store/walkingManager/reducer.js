import types from './actionTypes';

const initialState = {
  walks: [],
  sortParams: {
    date: { order: 'asc' },
    distance: { order: 'asc' },
    activeParam: 'date',
  },
  badge: {
    activeWalk: null,
    isOpen: false,
  },
  isFetching: false,
  errorMsg: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.set_active_param:
      return {
        ...state,
        sortParams: {
          ...state.sortParams,
          activeParam: action.param,
        },
      };
    case types.set_sort_order:
      return {
        ...state,
        sortParams: {
          ...state.sortParams,
          [action.param]: {
            ...state.sortParams[action.param],
            order: action.order,
          },
        },
      };
    case types.set_walks:
      return {
        ...state,
        walks: action.walks,
      };
    case types.set_fetching:
      return {
        ...state,
        isFetching: action.value,
      };
    case types.set_error:
      return {
        ...state,
        errorMsg: action.value,
      };
    case types.clear_error:
      return {
        ...state,
        errorMsg: null,
      };
    case types.set_batch_mode:
      return {
        ...state,
        badge: {
          ...state.badge,
          isOpen: action.isOpen,
        },
      };
    case types.set_active_walk:
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

export default reducer;
