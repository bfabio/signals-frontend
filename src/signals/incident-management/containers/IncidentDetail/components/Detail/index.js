import React from 'react';
import PropTypes from 'prop-types';

import { string2date, string2time } from 'shared/services/string-parser/string-parser';

import './style.scss';

import Highlight from '../../components/Highlight';
import Location from './components/Location';
import Attachments from './components/Attachments';
import ExtraProperties from './components/ExtraProperties';

class Detail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { incident, attachments, stadsdeelList, onShowLocation, onEditLocation, onShowAttachment } = this.props;

    return (
      <article className="detail">
        <div className="incident-detail__text">
          {incident.text}
        </div>

        <dl>
          <dt className="incident-detail__definition">Overlast</dt>
          <dd className="incident-detail__value">{string2date(incident.incident_date_start)} {string2time(incident.incident_date_start)}&nbsp;</dd>

          <Highlight
            subscribeTo={incident.location}
          >
            <Location
              incident={incident}
              stadsdeelList={stadsdeelList}
              onShowLocation={onShowLocation}
              onEditLocation={onEditLocation}
            />
          </Highlight>

          <Attachments
            attachments={attachments}
            onShowAttachment={onShowAttachment}
          />

          {incident.extra_properties ? <ExtraProperties items={incident.extra_properties} /> : ''}

          <dt className="incident-detail__definition">Email</dt>
          <dd className="incident-detail__value">{incident.reporter.email}</dd>

          <dt className="incident-detail__definition">Telefoonnummer</dt>
          <dd className="incident-detail__value">{incident.reporter.phone}</dd>
        </dl>
      </article>
    );
  }
}

Detail.propTypes = {
  incident: PropTypes.object.isRequired,
  attachments: PropTypes.array.isRequired,
  stadsdeelList: PropTypes.array.isRequired,

  onShowAttachment: PropTypes.func.isRequired,
  onShowLocation: PropTypes.func.isRequired,
  onEditLocation: PropTypes.func.isRequired
};

export default Detail;
