const SET_SORT_PARAMS = 'SET_SORT_PARAMS';

const initialState = {
  sortParams: {
    sortOrder: 'asc',
    sortBy: 'date',
  },
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_PARAMS:
      return {
        ...state,
        sortParams: { ...action.sortParams },
      };
    default:
      return state;
  }
};

export const setSortParams = ({ sortBy, sortOrder }) => ({
  type: SET_SORT_PARAMS,
  sortParams: { sortOrder, sortBy },
});
//
// const setApiError = error => ({
//   type: SET_ERROR,
//   error,
// });
//
// export const login = formData => dispatch => {
//   authAPI.login(formData).then(data => {
//     if (data.resultCode === 0) {
//       dispatch(setMe());
//     } else if (data.resultCode === 10) {
//       authAPI.getCaptcha().then(resp => console.log(resp));
//     } else {
//       const error = {};
//       if (data.fieldsErrors.length > 0) {
//         data.fieldsErrors.forEach(err => {
//           error[err.field] = err.error;
//         });
//       } else {
//         error.common = data.messages[0];
//       }
//       dispatch(setApiError(error));
//     }
//   });
// };

// export const logout = () => dispatch => {
//   authAPI.logout().then(data => {
//     if (data.resultCode === 0) {
//       dispatch(clearAuthClientData());
//     }
//   });
// };

export default managerReducer;
