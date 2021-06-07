import {
  ADD_USER_ERROR,
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  CLEAR_ERROR,
} from '../../action/User/AddUser.Action';

export const initialState = {
  pending: false,
  status: '',
  error: null,
};
const addUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        status: action.status,
        pending: false,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        pending: false,
        error: null,
      };
    default:
      return state;
  }
};
export default addUserReducer;
