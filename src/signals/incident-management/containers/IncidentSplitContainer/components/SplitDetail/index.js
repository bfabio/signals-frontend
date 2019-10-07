import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import { string2date, string2time } from 'shared/services/string-parser/string-parser';
import { getListValueByKey } from 'shared/services/list-helper/list-helper';

import './style.scss';

const StyledHeading = styled(Heading)`
  font-weight: normal;
`;

const SplitDetail = ({ incident, stadsdeelList }) => (
  <aside className="split-detail">
    {incident ?
    (
      <div>
        <StyledHeading $as="h4">Melding {incident.id}</StyledHeading>

        <dl>
          <dt className="split-detail__definition">Datum</dt>
          <dd className="split-detail__value">{string2date(incident.created_at)}</dd>
          <dt className="split-detail__definition">Tijd</dt>
          <dd className="split-detail__value">{string2time(incident.created_at)}</dd>
          <dt className="split-detail__definition">Datum overlast</dt>
          <dd className="split-detail__value">{string2date(incident.incident_date_start)}</dd>
          <dt className="split-detail__definition">Tijd overlast</dt>
          <dd className="split-detail__value">{string2time(incident.incident_date_start)}</dd>
          <dt className="split-detail__definition">Stadsdeel</dt>
          <dd className="split-detail__value">{getListValueByKey(stadsdeelList, incident.location.stadsdeel)}</dd>
          <dt className="split-detail__definition">Adres</dt>
          <dd className="split-detail__value">{incident.location.address_text}</dd>
          {incident.reporter.email ? <dt className="split-detail__definition">E-mailadres</dt> : ''}
          {incident.reporter.email ? <dd className="split-detail__value">{incident.reporter.email}</dd> : ''}
          {incident.reporter.phone ? <dt className="split-detail__definition">Telefonnummer</dt> : ''}
          {incident.reporter.phone ? <dd className="split-detail__value">{incident.reporter.phone}</dd> : ''}
          <dt className="split-detail__definition">Bron</dt>
          <dd className="split-detail__value">{incident.source}</dd>
          <dt className="split-detail__definition">Verantwoordelijke afdeling</dt>
          <dd className="split-detail__value">{incident.category.department}</dd>
        </dl>
      </div>
    )
      : ''}
  </aside>
);


SplitDetail.propTypes = {
  stadsdeelList: PropTypes.array,
  incident: PropTypes.object
};

export default SplitDetail;
