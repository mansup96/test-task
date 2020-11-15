import axios from 'axios';

let $axios = axios.create({
  baseURL: 'http://localhost:3000/walking',
});

export const api = {
  getWalks(query) {
    return $axios
      .get(`/${query}`)
      .then(resp => resp.data)
      .catch(err => new Promise((res, rej) => rej(err)));
  },

  postWalk(walk) {
    return $axios
      .post('/', walk)
      .then(resp => resp)
      .catch(err => console.log(err));
  },

  putWalk(walk, id) {
    return $axios
      .put(`/${id}`, walk)
      .then(resp => resp)
      .catch(err => console.log(err));
  },

  deleteWalk(id) {
    return $axios
      .delete(`/${id}`)
      .then(resp => resp)
      .catch(err => console.log(err));
  },
};
