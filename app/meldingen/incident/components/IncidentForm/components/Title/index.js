import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ meta }) => (
  <div>
    <h4>{meta.label}</h4>
    <div className="title__subtitle">{meta.subtitle}</div>
  </div>
);

Title.propTypes = {
  meta: PropTypes.object.isRequired
};

export default Title;