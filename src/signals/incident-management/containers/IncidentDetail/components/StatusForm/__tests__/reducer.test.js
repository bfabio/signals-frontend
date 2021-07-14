// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2020 - 2021 Gemeente Amsterdam
import statusList, {
  changeStatusOptionList,
} from 'signals/incident-management/definitions/statusList'
import incidentFixture from 'utils/__tests__/fixtures/incident.json'
import * as constants from '../constants'

import reducer, { init } from '../reducer'

const initialisedState = init({ incident: incidentFixture })
const state = {
  foo: 'bar',
}

describe('signals/incident-management/containers/IncidentDetail/components/StatusForm/reducer', () => {
  it('should initialise the state', () => {
    const status = statusList.find(
      ({ key }) => key === incidentFixture.status.state
    )

    expect(initialisedState).toEqual({
      status,
      check: {
        checked: false,
        disabled: false,
      },
      errors: {},
      flags: {
        hasEmail: true,
        hasOpenChildren: false,
        isSplitIncident: false,
      },
      text: {
        defaultValue: '',
        value: '',
        required: false,
        label: constants.DEFAULT_TEXT_LABEL,
        subtitle: constants.DEFAULT_TEXT_SUBTITLE,
        maxLength: constants.DEFAULT_TEXT_MAX_LENGTH,
        rows: 9,
      },
      warnings: [],
      originalStatus: status,
    })
  })

  it('should return the state', () => {
    expect(reducer(state, {})).toEqual(state)
  })

  it('should handle SET_STATUS', () => {
    const intermediateState = {
      ...initialisedState,
      check: {
        checked: false,
        disabled: false,
      },
      errors: { someOther: 'This be required', text: 'Whoops' },
      text: {
        ...initialisedState.text,
        defaultValue: 'Some default value',
        value: 'A previously set value',
      },
    }

    const statusSendsEmailWhenSet = changeStatusOptionList.find(
      ({ email_sent_when_set }) => email_sent_when_set
    )
    const expectedState = {
      ...intermediateState,
      check: {
        checked: true,
        disabled: true,
      },
      errors: { ...intermediateState.errors, text: undefined },
      status: statusSendsEmailWhenSet,
      text: {
        ...intermediateState.text,
        defaultValue: '',
        required: true,
        label: constants.REPLY_MAIL_LABEL,
        subtitle: constants.REPLY_MAIL_SUBTITLE,
        maxLength: constants.REPLY_MAIL_MAX_LENGTH,
        rows: 5,
      },
    }

    expect(
      reducer(intermediateState, {
        type: 'SET_STATUS',
        payload: statusSendsEmailWhenSet,
      })
    ).toEqual(expect.objectContaining(expectedState))
  })

  it('should handle TOGGLE_CHECK', () => {
    const afterToggle = reducer(initialisedState, { type: 'TOGGLE_CHECK' })

    expect(afterToggle).toEqual({
      ...initialisedState,
      check: { ...initialisedState.check, checked: true },
      text: { ...initialisedState.text, required: true },
    })

    expect(reducer(afterToggle, { type: 'TOGGLE_CHECK' })).toEqual(
      initialisedState
    )
  })

  it('should handle SET_DEFAULT_TEXT', () => {
    const intermediateState = {
      ...initialisedState,
      errors: { someOther: 'This be required', text: 'Whoops' },
      text: { ...initialisedState.text, value: 'A previously set value' },
    }

    const payload = 'Here be dragons'
    expect(
      reducer(intermediateState, { type: 'SET_DEFAULT_TEXT', payload })
    ).toEqual({
      ...intermediateState,
      errors: { ...intermediateState.errors, text: undefined },
      text: { ...intermediateState.text, value: '', defaultValue: payload },
    })
  })

  it('should handle SET_TEXT', () => {
    const intermediateState = {
      ...initialisedState,
      errors: { someOther: 'This be required', text: 'Whoops' },
      text: {
        ...initialisedState.text,
        defaultValue: 'A previously set value',
      },
    }

    const payload = 'Here be dragons'
    expect(reducer(intermediateState, { type: 'SET_TEXT', payload })).toEqual({
      ...intermediateState,
      errors: { ...intermediateState.errors, text: undefined },
      text: { ...intermediateState.text, value: payload, defaultValue: '' },
    })
  })

  it('should handle SET_ERRORS', () => {
    const intermediateState = {
      ...initialisedState,
      errors: { someOther: 'This be required', text: 'Whoops' },
    }

    const payload = { email: 'Here be dragons' }
    expect(reducer(intermediateState, { type: 'SET_ERRORS', payload })).toEqual(
      {
        ...intermediateState,
        errors: { ...intermediateState.errors, ...payload },
      }
    )
  })
})
