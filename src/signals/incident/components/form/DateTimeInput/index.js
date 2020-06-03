import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Select from 'components/SelectInput';
import Header from '../Header';

import './style.scss';

const DateTimeInput = ({ touched, hasError, meta, parent, getError, validatorsOrOpts }) => {
  function formatDate(offset, type = 'value') {
    const format = type === 'label' ? 'dddd D MMMM' : 'YYYY-MM-DD';
    if (offset === 0) {
      return 'Vandaag';
    }
    return moment()
      .subtract(offset, 'days')
      .format(format);
  }

  if (!meta?.isVisible) return null;

  return (
    <Header meta={meta} options={validatorsOrOpts} touched={touched} hasError={hasError} getError={getError}>
      <div className="datetime-input__earlier">
        <div className="datetime-input__earlier-date">
          <Select
            name="day"
            data-testid="selectDay"
            label={<strong>Dag</strong>}
            value={`${parent.value.incident_date}`}
            onChange={e => parent.meta.updateIncident({ incident_date: e.target.value })}
            options={[...Array(7).keys()].map(offset => ({
              value: formatDate(offset),
              key: formatDate(offset, 'label'),
              name: formatDate(offset, 'label'),
            }))}
          />
        </div>

        <div className="datetime-input__earlier-time">
          <div>
            <Select
              name="hours"
              data-testid="selectHours"
              label={<strong>Tijd</strong>}
              value={`${parent.value.incident_time_hours}`}
              onChange={e => parent.meta.updateIncident({ incident_time_hours: e.target.value })}
              options={[...Array(24).keys()].map(value => ({ value, key: value, name: value }))}
            />
          </div>
          <span className="datetime-input__earlier-time-label">uur</span>
          <Select
            name="minutes"
            data-testid="selectMinutes"
            value={`${parent.value.incident_time_minutes}`}
            onChange={e => parent.meta.updateIncident({ incident_time_minutes: e.target.value })}
            options={[...Array(12).keys()].map(minute => ({ value: minute * 5, name: minute * 5, key: minute * 5 }))}
          />
          <span className="datetime-input__earlier-time-label">min</span>
        </div>
      </div>
    </Header>
  );
};

DateTimeInput.propTypes = {
  touched: PropTypes.bool,
  hasError: PropTypes.func,
  meta: PropTypes.object,
  parent: PropTypes.object,
  getError: PropTypes.func,
  validatorsOrOpts: PropTypes.object,
};

export default DateTimeInput;
