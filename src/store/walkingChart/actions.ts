import { actionTypes } from './actionTypes';

const setBadgeMode = (isOpen: boolean) => ({
  type: actionTypes.set_batch_mode,
  isOpen,
});

const cleanWalks = () => ({ type: actionTypes.clean_walks });

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

const getDistance = (distance: number): string => {
  const words = ['метр', 'метра', 'метров'];
  const meters = declOfNum(distance, words);
  if (distance < 1000) {
    return `${distance} ${meters}`;
  } else if (distance % 1000 === 0) {
    return `${distance / 1000} км`;
  } else {
    return `${Math.trunc(distance / 1000)} км ${distance % 1000} ${meters}`;
  }
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
