import {
  GET_USER_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
} from '../../action/User/GetUser.Action';

export const initialState = {
  pending: false,
  dataUser: [],
  error: null,
};
const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        dataUser: action.dataUser,
        pending: false,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: action.error,
        pending: false,
      };
    default:
      return state;
  }
};
export default getUserReducer;
