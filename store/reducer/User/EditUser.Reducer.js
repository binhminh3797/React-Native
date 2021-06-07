import {
  EDIT_USER_ERROR,
  EDIT_USER_PENDING,
  EDIT_USER_SUCCESS,
} from '../../action/User/EditUser.Action';

export const initialState = {
  pending: false,
  status: '',
  error: null,
};
const editUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        status: action.status,
        pending: false,
      };
    case EDIT_USER_ERROR:
      return {
        ...state,
        error: action.error,
        pending: false,
      };
    default:
      return state;
  }
};
export default editUserReducer;
