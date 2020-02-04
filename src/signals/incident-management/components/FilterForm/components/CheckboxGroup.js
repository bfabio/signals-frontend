import React, { memo } from 'react';
import PropTypes from 'prop-types';

import * as types from 'shared/types';
import Label from 'components/Label';
import CheckboxList from '../../CheckboxList';
import { FilterGroup } from '../styled';

const CheckboxGroup = ({
  defaultValue,
  label,
  name,
  onChange,
  onToggle,
  options,
}) =>
  Array.isArray(options) &&
  options.length > 0 && (
    <FilterGroup data-testid={`${name}CheckboxGroup`}>
      <CheckboxList
        defaultValue={defaultValue}
        hasToggle
        name={name}
        onChange={onChange}
        onToggle={onToggle}
        options={options}
        title={
          <Label as="span" isGroupHeader>
            {label}
          </Label>
        }
      />
    </FilterGroup>
  );

CheckboxGroup.defaultProps = {
  defaultValue: [],
};

CheckboxGroup.propTypes = {
  defaultValue: types.dataListType,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  options: types.dataListType.isRequired,
};

export default memo(CheckboxGroup);
