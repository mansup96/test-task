import { CreatedWalk, MappedWalk, Walk } from '../walkingManager/types';
import { RootState } from '../index';

const declOfNum = (number: number, words: string[]): string => {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
  ];
};

export const getDistance = (distance: number): [string, string] => {
  const words = ['метр', 'метра', 'метров'];
  const meters = declOfNum(distance, words);
  if (distance < 1000) {
    return [`${distance} ${meters}`, `${distance} м.`];
  } else if (distance % 1000 === 0) {
    return [`${distance / 1000} км`, `${distance / 1000} км`];
  } else {
    return [
      `${Math.trunc(distance / 1000)} км ${distance % 1000} ${meters}`,
      `${Math.trunc(distance / 1000)} км ${distance % 1000} м.`,
    ];
  }
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getMappedData = (data: Walk[]): MappedWalk[] => {
  return data.map(walk => {
    const date: Date = new Date(walk.date);
    return {
      ...walk,
      localeDate: date.toLocaleDateString('ru'),
      localeDay: capitalizeFirstLetter(
        date.toLocaleDateString('ru', { weekday: 'long' })
      ),
      transformedDistance: getDistance(walk.distance),
    };
  });
};

export const isInTheRange = (
  walk: Walk | CreatedWalk,
  getState: () => RootState
): boolean => {
  const [start, end] = getState().managerReducer.chartRange;

  return !!(
    start &&
    end &&
    new Date(walk.date).getTime() > start.getTime() &&
    new Date(walk.date).getTime() < end.getTime()
  );
};
