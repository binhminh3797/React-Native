export const GET_DETAILS_USER_PENDING = 'GET_DETAILS_USER_PENDING';
export const GET_DETAILS_USER_SUCCESS = 'GET_DETAILS_USER_SUCCESS';
export const GET_DETAILS_USER_ERROR = 'GET_DETAILS_USER_ERROR';

export const actGetDetailsUserPending = id => {
  return {
    type: GET_DETAILS_USER_PENDING,
    id,
  };
};
export const actGetDetailsUserSuccess = detailsUser => {
  return {
    type: GET_DETAILS_USER_SUCCESS,
    detailsUser,
  };
};
export const actGetDetailsUserError = error => {
  return {
    type: GET_DETAILS_USER_ERROR,
    error,
  };
};
