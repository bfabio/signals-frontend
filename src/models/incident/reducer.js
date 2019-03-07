import { fromJS } from 'immutable';

import stadsdeelList from 'signals/incident-management/definitions/stadsdeelList';
import priorityList from 'signals/incident-management/definitions/priorityList';

import { REQUEST_PRIORITY_UPDATE_SUCCESS } from 'signals/incident-management/containers/IncidentPriorityContainer/constants';
import { REQUEST_CATEGORY_UPDATE_SUCCESS } from 'signals/incident-management/containers/IncidentCategoryContainer/constants';
import { REQUEST_STATUS_CREATE_SUCCESS } from 'signals/incident-management/containers/IncidentStatusContainer/constants';
import { SPLIT_INCIDENT_SUCCESS, SPLIT_INCIDENT_ERROR } from 'signals/incident-management/containers/IncidentSplitContainer/constants';

import {
  REQUEST_INCIDENT, REQUEST_INCIDENT_SUCCESS, REQUEST_INCIDENT_ERROR, DISMISS_SPLIT_NOTIFICATION
} from './constants';

export const initialState = fromJS({
  id: null,
  stadsdeelList,
  priorityList,
  loading: false,
  error: false,
  split: false
});

function incidentModelReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INCIDENT:
      return state
        .set('loading', true)
        .set('error', false)
        .set('id', action.payload)
        .set('incident', null);

    case REQUEST_INCIDENT_SUCCESS:
      return state
        .set('incident', fromJS(action.payload))
        .set('error', false)
        .set('loading', false);

    case REQUEST_INCIDENT_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);

    case DISMISS_SPLIT_NOTIFICATION:
      return state
        .set('split', false);

    case REQUEST_CATEGORY_UPDATE_SUCCESS:
      return state
        .set('incident', fromJS({ ...state.get('incident').toJS(), category: action.payload }));

    case REQUEST_PRIORITY_UPDATE_SUCCESS:
      return state
        .set('incident', fromJS({ ...state.get('incident').toJS(), priority: action.payload }));

    case REQUEST_STATUS_CREATE_SUCCESS:
      return state
        .set('incident', fromJS({ ...state.get('incident').toJS(), status: action.payload }));

    case SPLIT_INCIDENT_SUCCESS:
    case SPLIT_INCIDENT_ERROR:
      return state
        .set('split', action.payload);

    default:
      return state;
  }
}

export default incidentModelReducer;