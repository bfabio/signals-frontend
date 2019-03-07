import { put, takeLatest } from 'redux-saga/effects';

import CONFIGURATION from 'shared/services/configuration/configuration';
import { authCall } from 'shared/services/api/api';

import { REQUEST_INCIDENT } from './constants';
import { requestIncidentSuccess, requestIncidentError } from './actions';

export function* fetchIncident(action) {
  const requestURL = `${CONFIGURATION.API_ROOT}signals/auth/signal`;
  try {
    const id = action.payload;
    const incident = yield authCall(`${requestURL}/${id}/`);
    yield put(requestIncidentSuccess(incident));
  } catch (err) {
    yield put(requestIncidentError(err));
  }
}

export default function* watchIncidentModelSaga() {
  yield takeLatest(REQUEST_INCIDENT, fetchIncident);
}