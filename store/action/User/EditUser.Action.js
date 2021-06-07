export const EDIT_USER_PENDING = 'EDIT_USER_PENDING';
export const EDIT_USER_SUCCESS = 'EEDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export const actEditUserPending = (id, fullName, age, email, gender) => {
  return {
    type: EDIT_USER_PENDING,
    id,
    fullName,
    age,
    email,
    gender,
  };
};
export const actEditUserSuccess = status => {
  return {
    type: EDIT_USER_SUCCESS,
    status,
  };
};
export const actEditUserError = error => {
  return {
    type: EDIT_USER_ERROR,
    error,
  };
};
