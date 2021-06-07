import {all, fork} from '@redux-saga/core/effects';
import userSaga from './sagasUser';

export default function* root() {
  yield all([fork(userSaga)]);
}
