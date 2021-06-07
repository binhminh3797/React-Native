export const DELETE_USER_PENDING = 'DELETE_USER_PENDING';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';
export const actDeleteUserPending = id => {
  return {
    type: DELETE_USER_PENDING,
    id,
  };
};
export const actDeleteUserSuccess = status => {
  return {
    type: DELETE_USER_SUCCESS,
    status,
  };
};
export const actDeleteUserError = error => {
  return {
    type: DELETE_USER_ERROR,
    error,
  };
};
