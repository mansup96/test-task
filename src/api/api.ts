import axios from 'axios';
import { Walk } from '../store/walkingManager/actionTypes';

let $axios = axios.create({
  baseURL: 'http://localhost:3333/walking',
});

export const api = {
  getWalks(query: string) {
    return $axios.get(`/${query}`).then(resp => resp.data);
  },

  postWalk(walk: Walk) {
    return $axios.post('/', walk).then(resp => resp);
  },

  putWalk(walk: Walk, id: number) {
    return $axios.put(`/${id}`, walk).then(resp => resp.data);
  },

  deleteWalk(id: number) {
    return $axios.delete(`/${id}`).then(resp => resp);
  },
};
