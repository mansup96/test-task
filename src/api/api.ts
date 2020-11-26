import axios from 'axios';
import { Walk } from '../store/walkingManager/actionTypes';
import queryString from 'querystring';

let $axios = axios.create({
  baseURL: 'http://localhost:3333/walking',
});

type GetWalksResponse = {
  data: Walk[];
  totalCount: number;
};

type QueryParams = {
  _sort: string;
  _order: 'asc' | 'desc';
  _page: number;
  _limit: number;
};

export const api = {
  getWalks: async (queryParams: QueryParams): Promise<GetWalksResponse> => {
    const stringifiedParams = queryString.stringify(queryParams);
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
};
