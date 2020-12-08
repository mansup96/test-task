import { types, ManagerStateTypes } from './types';
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
  activeSortParam: 'date',
  badge: {
    selectedWalk: null,
    isOpen: false,
  },
  chartRange: [subDays(new Date(), 7), new Date()],
  rangedWalks: [],
  isFetching: false,
  errorMsg: '',
};

const reducer = (state = initialState, action: any): ManagerStateTypes => {
  switch (action.type) {
    case types.set_active_param:
      return {
        ...state,
        activeSortParam: action.param,
      };
    case types.set_sort_order:
      return {
        ...state,
        sortParams: {
          ...state.sortParams,
          [action.param]: {
            order: action.order,
          },
        },
      };
    case types.set_walks:
      return {
        ...state,
        walks: [...state.walks, ...action.walks],
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
        errorMsg: '',
      };
    case types.set_batch_mode:
      return {
        ...state,
        badge: {
          ...state.badge,
          isOpen: action.isOpen,
        },
      };
    case types.set_selected_walk:
      return {
        ...state,
        badge: {
          ...state.badge,
          selectedWalk: action.walk,
        },
      };
    case types.set_total_count:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          totalCount: action.count,
        },
      };
    case types.set_page:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          page: action.page,
        },
      };
    case types.clean_walks:
      return {
        ...state,
        walks: [],
      };
    case types.set_rangedWalks:
      return {
        ...state,
        rangedWalks: action.walks,
      };
    case types.set_range:
      return {
        ...state,
        chartRange: action.chartRange,
      };
    default:
      return state;
  }
};

export default reducer;
