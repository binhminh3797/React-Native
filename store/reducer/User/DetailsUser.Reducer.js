import {
  GET_DETAILS_USER_ERROR,
  GET_DETAILS_USER_PENDING,
  GET_DETAILS_USER_SUCCESS,
} from '../../action/User/DetailsUser.Action';

export const initialState = {
  pending: false,
  detailsUser: {},
  error: null,
};
const getDetailsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_DETAILS_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        detailsUser: action.detailsUser,
      };
    case GET_DETAILS_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default getDetailsUserReducer;
