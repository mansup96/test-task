import axios from 'axios';
import {
  CreatedWalk,
  SortOrderType,
  Walk,
} from '../store/walkingManager/types';
import queryString from 'query-string';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

let $axios = axios.create({
  baseURL: `${apiUrl}/walking`,
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

  postWalk: async (walk: CreatedWalk) => (await $axios.post('/', walk)).data,

  putWalk: async (walk: Walk) => (await $axios.put(`/${walk.id}`, walk)).data,

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
