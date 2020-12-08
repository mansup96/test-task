export const types = {
  set_active_param: 'manager/set_active_sort_param',
  set_sort_order: 'manager/set_sort_order',
  set_walks: 'manager/set_walks',
  set_fetching: 'manager/set_fetching',
  set_error: 'manager/set_error',
  clear_error: 'manager/clear_error',
  set_batch_mode: 'manager/set_batch_mode',
  set_selected_walk: 'manager/set_selected_walk',
  set_total_count: 'manager/set_total_count',
  set_page: 'manager/set_page',
  clean_walks: 'manager/clean_walks',
  set_rangedWalks: 'manager/set_rangedWalks',
  set_range: 'manager/set_range',
};

export type ActiveSortParamType = 'date' | 'distance';
export type SortOrderType = 'asc' | 'desc';
export type StateSortParams = {
  date: { order: SortOrderType };
  distance: { order: SortOrderType };
};
export type BadgeType = {
  selectedWalk: MappedWalk | null;
  isOpen: boolean;
};

export type PaginationParamsType = {
  limit: number;
  page: number;
  totalCount: number;
};

export type ManagerStateTypes = {
  walks: Walk[];
  sortParams: StateSortParams;
  activeSortParam: ActiveSortParamType;
  paginationParams: PaginationParamsType;
  badge: BadgeType;
  isFetching: boolean;
  errorMsg: string;
  chartRange: ChartRangeType;
  rangedWalks: Walk[];
};

export type ChartRangeType = [Date | null, Date | null];

export type Walk = {
  id: number;
  distance: number;
  date: string;
};

export type CreatedWalk = {
  distance: number;
  date: string;
  id: null;
}

export type MappedWalk = Walk & {
  localeDate: string;
  localeDay: string;
  transformedDistance: [string, string];
};

export type SortParamsType = { param: string; order: string };
