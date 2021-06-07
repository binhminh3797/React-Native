export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const actAddUserPending = (fullName, age, email, gender) => {
  return {
    type: ADD_USER_PENDING,
    fullName,
    age,
    email,
    gender,
  };
};
export const actAddUserSuccess = status => {
  return {
    type: ADD_USER_SUCCESS,
    status,
  };
};
export const actAddUserFailure = error => {
  return {
    type: ADD_USER_ERROR,
    error,
  };
};
export const actClearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
