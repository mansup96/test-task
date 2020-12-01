export const actionTypes = {
  set_active_param: 'chart/set_active_param',
  set_sort_order: 'chart/set_sort_order',
  set_walks: 'chart/set_walks',
  set_fetching: 'chart/set_fetching',
  set_error: 'chart/set_error',
  clear_error: 'chart/clear_error',
  set_batch_mode: 'chart/set_batch_mode',
  set_active_walk: 'chart/set_active_walk',
  set_total_count: 'chart/set_total_count',
  set_page: 'chart/set_page',
  clean_walks: 'chart/clean_walks',
};

export type PaginationParamsType = {
  limit: number;
  page: number;
  totalCount: number;
};

export type ChartStateTypes = {
  range: 'week' | 'month';
};
