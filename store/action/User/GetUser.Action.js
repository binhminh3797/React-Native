export const GET_USER_PENDING = 'GET_USER_PENDING';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const actGetUserPending = searchValue => {
  return {
    type: GET_USER_PENDING,
    searchValue,
  };
};
export const actGetUserSuccess = dataUser => {
  return {
    type: GET_USER_SUCCESS,
    dataUser,
  };
};
export const actGetUserError = error => {
  return {
    type: GET_USER_ERROR,
    error,
  };
};
