import { actionTypes, ManagerStateTypes } from './actionTypes';
import { subDays } from 'date-fns';

const initialState: ManagerStateTypes = {
  walks: [],
  sortParams: {
    date: { order: 'desc' },
    distance: { order: 'asc' },
  },
  paginationParams: {
    limit: 15,
    totalCount: 0,
    page: 1,
  },
  activeParam: 'date',
  badge: {
    activeWalk: null,
    isOpen: false,
  },
  chartRange: [subDays(new Date(), 7), new Date()],
  rangedWalks: [],
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
        walks: [...state.walks, ...action.walks],
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
    case actionTypes.set_total_count:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          totalCount: action.count,
        },
      };
    case actionTypes.set_page:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          page: action.page,
        },
      };
    case actionTypes.clean_walks:
      return {
        ...state,
        walks: [],
      };
    case actionTypes.set_rangedWalks:
      return {
        ...state,
        rangedWalks: action.walks,
      };
    case actionTypes.set_range:
      return {
        ...state,
        chartRange: action.chartRange,
      };
    default:
      return state;
  }
};

export default reducer;
