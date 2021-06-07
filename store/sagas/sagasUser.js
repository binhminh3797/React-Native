import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import AddUserService from '../service/User/AddUser.Service';
import DeleteUserService from '../service/User/DeleteUser.Service';
import EditUserService from '../service/User/EditUser.Service';
import GetDetailsUserService from '../service/User/GetDetailsUser.Service';
import GetUserService from '../service/User/GetUser.Service';
import {
  actGetUserError,
  actGetUserSuccess,
  GET_USER_PENDING,
} from '../action/User/GetUser.Action';
import {
  actGetDetailsUserError,
  actGetDetailsUserSuccess,
  GET_DETAILS_USER_PENDING,
} from '../action/User/DetailsUser.Action';
import {
  actAddUserSuccess,
  actAddUserFailure,
  ADD_USER_PENDING,
} from '../action/User/AddUser.Action';
import {
  actEditUserError,
  actEditUserSuccess,
  EDIT_USER_PENDING,
} from '../action/User/EditUser.Action';
import {
  actDeleteUserError,
  actDeleteUserSuccess,
  DELETE_USER_PENDING,
} from '../action/User/DeleteUser.Action';
//-----------------Get User -----------------------//
export function* getAllUser(action) {
  try {
    const dataUser = yield call(
      GetUserService.getUserInfoBack4App,
      action.searchValue,
    );
    yield put(actGetUserSuccess(dataUser));
  } catch (e) {
    yield put(actGetUserError(e));
  }
}
export function* watchGetAllUser() {
  yield takeEvery(GET_USER_PENDING, getAllUser);
}
//-----------------Details User -----------------------//
export function* getDetailsUser(action) {
  try {
    const detailsUser = yield call(
      GetDetailsUserService.getDetailsUserBack4App,
      action.id,
    );
    yield put(actGetDetailsUserSuccess(detailsUser));
  } catch (err) {
    yield put(actGetDetailsUserError(err));
  }
}
export function* watchGetDetailsUser() {
  yield takeEvery(GET_DETAILS_USER_PENDING, getDetailsUser);
}
//-----------------Add User -----------------------//
export function* addUser(action) {
  try {
    const status = yield call(
      AddUserService.addUserBack4App,
      action.fullName,
      action.age,
      action.email,
      action.gender,
    );
    yield put(actAddUserSuccess(status));
  } catch (err) {
    yield put(actAddUserFailure(err));
  }
}
export function* watchAddUser() {
  yield takeEvery(ADD_USER_PENDING, addUser);
}
//-----------------Edit User -----------------------//
export function* editUser(action) {
  try {
    const status = yield call(
      EditUserService.editUserBack4App,
      action.id,
      action.fullName,
      action.age,
      action.email,
      action.gender,
    );
    yield put(actEditUserSuccess(status));
  } catch (err) {
    yield put(actEditUserError(err));
  }
}
export function* watchEditUser() {
  yield takeEvery(EDIT_USER_PENDING, editUser);
}
//-----------------Delete User -----------------------//
export function* deleteUser(action) {
  try {
    const status = yield call(DeleteUserService.deleteUserBack4App, action.id);
    yield put(actDeleteUserSuccess(status));
  } catch (err) {
    yield put(actDeleteUserError(err));
  }
}
export function* watchDeleteUser() {
  yield takeEvery(DELETE_USER_PENDING, deleteUser);
}
export default function* userSaga() {
  yield all([
    fork(getAllUser),
    fork(watchGetAllUser),
    fork(getDetailsUser),
    fork(watchGetDetailsUser),
    fork(addUser),
    fork(watchAddUser),
    fork(editUser),
    fork(watchEditUser),
    fork(deleteUser),
    fork(watchDeleteUser),
  ]);
}
