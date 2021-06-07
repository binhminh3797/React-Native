import {
  DELETE_USER_ERROR,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
} from '../../action/User/DeleteUser.Action';

const initialState = {
  pending: false,
  status: '',
  error: null,
};
const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        status: action.status,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default deleteUserReducer;
