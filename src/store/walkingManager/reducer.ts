import { actionTypes, ManagerStateTypes } from './actionTypes';

const initialState: ManagerStateTypes = {
  walks: [],
  sortParams: {
    date: { order: 'asc' },
    distance: { order: 'asc' },
  },
  activeParam: 'date',
  badge: {
    activeWalk: null,
    isOpen: false,
  },
  isFetching: false,
  errorMsg: null,
};

const reducer = (state = initialState, action: any): ManagerStateTypes => {
  switch (action.type) {
    case actionTypes.set_active_param:
      return {
        ...state,
        activeParam: action.param,
      };
    case actionTypes.set_sort_order:
      return {
        ...state,
        sortParams: {
          ...state.sortParams,
          [action.param]: {
            order: action.order,
          },
        },
      };
    case actionTypes.set_walks:
      return {
        ...state,
        walks: action.walks,
      };
    case actionTypes.set_fetching:
      return {
        ...state,
        isFetching: action.value,
      };
    case actionTypes.set_error:
      return {
        ...state,
        errorMsg: action.value,
      };
    case actionTypes.clear_error:
      return {
        ...state,
        errorMsg: null,
      };
    case actionTypes.set_batch_mode:
      return {
        ...state,
        badge: {
          ...state.badge,
          isOpen: action.isOpen,
        },
      };
    case actionTypes.set_active_walk:
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
