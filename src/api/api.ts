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
      .catch(err => new Promise((res, rej) => rej(err)));
  },

  postWalk(walk: walk) {
    return $axios
      .post('/', walk)
      .then(resp => resp)
      .catch(err => console.log(err));
  },

  putWalk(walk: walk, id: number) {
    return $axios
      .put(`/${id}`, walk)
      .then(resp => resp)
      .catch(err => console.log(err));
  },

  deleteWalk(id: number) {
    return $axios
      .delete(`/${id}`)
      .then(resp => resp)
      .catch(err => console.log(err));
  },
};
