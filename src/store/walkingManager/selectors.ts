import { Walk } from './types';
import { RootState } from '../index';
import { createSelector } from 'reselect';
import { getMappedData } from '../utils';

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
