import axios from 'axios';
import { Walk } from '../store/walkingManager/actionTypes';

let $axios = axios.create({
  baseURL: 'http://localhost:3333/walking',
});

export const api = {
  getWalks: async (query: string) =>
    (await $axios.get(`/${query}`)).data as Walk[],

  postWalk: async (walk: Walk) => (await $axios.post('/', walk)).data,

  putWalk: async (walk: Walk, id: number) =>
    (await $axios.put(`/${id}`, walk)).data,

  deleteWalk: async (id: number) => (await $axios.delete(`/${id}`)).data,
};
