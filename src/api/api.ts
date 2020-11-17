import axios from 'axios';

let $axios = axios.create({
  baseURL: 'http://localhost:3000/walking',
});

type walk = {
  id: [number, null];
  date: Date;
  distance: number;
}

export const api = {
  getWalks(query: string) {
    return $axios
      .get(`/${query}`)
      .then(resp => resp.data)
  },

  postWalk(walk: walk) {
    return $axios
      .post('/', walk)
      .then(resp => resp)
  },

  putWalk(walk: walk, id: number) {
    return $axios
      .put(`/${id}`, walk)
      .then(resp => resp)
  },

  deleteWalk(id: number) {
    return $axios
      .delete(`/${id}`)
      .then(resp => resp)
  },
};
