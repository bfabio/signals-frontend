import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from 'components/Select';

const Wrapper = styled.div`
  width: 100%;
`;

export const SelectInput = ({ name: inputName, display, values, groups, emptyOptionText }) => {
  const options = values.map(({ key, value, group }) => ({
    key: key || '',
    name: key ? value : emptyOptionText || value,
    value: key || '',
    group,
  }));

  const render = ({ handler }) => (
    <Wrapper>
      <Select
        label={<strong>{display}</strong>}
        name={inputName}
        {...handler()}
        options={options}
        groups={groups}
      />
    </Wrapper>
  );

  render.defaultProps = {
    touched: false,
    size: 10,
  };

  render.propTypes = {
    handler: PropTypes.func.isRequired,
    size: PropTypes.number,
    touched: PropTypes.bool,
  };
  return render;
};

export default SelectInput;
