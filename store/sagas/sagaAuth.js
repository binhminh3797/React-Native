import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import * as LoginAction from '../action/Auth/Login.Action';
import {
  actRegisterError,
  actRegisterSuccess,
  REGISTER_PENDING,
} from '../action/Auth/Register.Action';
import LoginService from '../service/Auth/Login.Service';
import RegisterService from '../service/Auth/Register.Service';

//--------------------Login----------------//
export function* loginApp(action) {
  if (action !== undefined) {
    try {
      const dataLogin = yield call(
        LoginService.loginBack4App,
        action.userName,
        action.password,
      );
      yield put(LoginAction.actLoginSuccess(dataLogin));
    } catch (e) {
      yield put(LoginAction.actLoginError(e));
    }
  }
}
export function* watchLogin() {
  yield takeEvery(LoginAction.LOGIN_PENDING, loginApp);
}
//------------------Register---------------//
export function* registerApp(action) {
  if (action !== undefined) {
    try {
      const dataRegister = yield call(
        RegisterService.registerBack4App,
        action.userName,
        action.password,
        action.email,
      );
      yield put(actRegisterSuccess(dataRegister));
    } catch (e) {
      yield put(actRegisterError(e));
    }
  }
}
export function* watchRegister() {
  yield takeEvery(REGISTER_PENDING, registerApp);
}
export default function* authSaga() {
  yield all([
    fork(loginApp),
    fork(watchLogin),
    fork(registerApp),
    fork(watchRegister),
  ]);
}
