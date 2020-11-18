export const actionTypes: { [key: string]: string } = {
  set_active_param: 'manager/set_active_param',
  set_sort_order: 'manager/set_sort_order',
  set_walks: 'manager/set_walks',
  set_fetching: 'manager/set_fetching',
  set_error: 'manager/set_error',
  clear_error: 'manager/clear_error',
  set_batch_mode: 'manager/set_batch_mode',
  set_active_walk: 'manager/set_active_walk',
};

export type ActiveParamType = 'date' | 'distance';
export type SortOrderType = 'asc' | 'desc';
export type StateSortParams = {
  date: { order: SortOrderType };
  distance: { order: SortOrderType };
};
export type BadgeType = {
  activeWalk: MappedWalk | null;
  isOpen: boolean;
};

export type ManagerStateTypes = {
  walks: MappedWalk[];
  sortParams: StateSortParams;
  activeParam: ActiveParamType;
  badge: BadgeType;
  isFetching: boolean;
  errorMsg: string | null;
};

export type Walk = {
  id: number | null;
  distance: number;
  date: string;
};

export type MappedWalk = Walk & {
  day: string;
  transformedDistance: string;
};

export type SortParamsType = { param: string; order: string };
