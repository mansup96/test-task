import { Walk } from './types';
import { RootState } from '../index';
import { createSelector } from 'reselect';
import { getDistance, getMappedData } from '../utils';

const getWalks = (state: RootState): Walk[] => state.managerReducer.walks;

export const getMappedWalks = createSelector(getWalks, walks => {
  return getMappedData(walks);
});

const getRangedWalks = (state: RootState): Walk[] => {
  return state.managerReducer.rangedWalks;
};

export const getMappedRangedWalks = createSelector(getRangedWalks, walks => {
  return getMappedData(walks);
});

export const getExtremums = createSelector(
  getMappedRangedWalks,
  (walks): string[] => {
    console.log(walks);
    const sortedWalks = walks.sort((a, b) => a.distance - b.distance);
    if (sortedWalks.length > 0) {
      return [
        sortedWalks[0]?.transformedDistance[0],
        sortedWalks[sortedWalks.length - 1]?.transformedDistance[0],
      ];
    }
    return ['', ''];
  }
);

export const getDistanceSum = createSelector(getMappedRangedWalks, walks => {
  const sum = walks.reduce((accum, walk) => {
    return accum + walk.distance;
  }, 0);

  return getDistance(sum)[0];
});
