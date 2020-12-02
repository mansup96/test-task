import axios from 'axios';
import { SortOrderType, Walk } from '../store/walkingManager/actionTypes';
import queryString from 'query-string';

let $axios = axios.create({
  baseURL: 'http://localhost:3333/walking',
});

type GetWalksResponseType = {
  data: Walk[];
  totalCount: number;
};

type QueryParams = {
  _sort: string[];
  _order: SortOrderType[];
  _page: number;
  _limit: number;
};

export const api = {
  getWalks: async (queryParams: QueryParams): Promise<GetWalksResponseType> => {
    const stringifiedParams = queryString.stringify(queryParams, {
      arrayFormat: 'comma',
    });
    const response = await $axios.get(`?${stringifiedParams}`);
    return {
      data: response.data,
      totalCount: Number(response.headers['x-total-count']),
    };
  },

  postWalk: async (walk: Walk) => (await $axios.post('/', walk)).data,

  putWalk: async (walk: Walk, id: number) =>
    (await $axios.put(`/${id}`, walk)).data,

  deleteWalk: async (id: number) => (await $axios.delete(`/${id}`)).data,

  getRangedWalks: async (range: {
    date_gte: string;
    date_lte: string;
  }): Promise<any> => {
    const stringifiedParams = queryString.stringify(range);
    const response = await $axios.get(`?${stringifiedParams}`);
    return response.data;
  },
};
