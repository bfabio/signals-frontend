import React from 'react';
import PropTypes from 'prop-types';
import { Button, Heading } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import { FormBuilder } from 'react-reactive-form';

import IncidentPart from '../IncidentPart';

const StyledButton = styled(Button)`
  margin-right: 20px;
`;

const StyledRemoveButton = styled(Button)`
  padding: 0;
  float: right;
`;

const StyledHeading = styled(Heading)`
  font-weight: normal;
`;

const StyledDisclaimer = styled.div`
  background-color: #e8e8e8;
  padding: 15px;
  margin: 20px 0;

  ul {
    margin: 0 0 0 25px;
    padding: 0;

    li {
      list-style-type: square;
      margin-top: 10px;
    }
  }
`;

class SplitForm extends React.Component {
  constructor(props) {
    super(props);

    const subcategory = props.incident.category.category_url;
    this.state = {
      isVisible: props.isVisible,
      splitForm: FormBuilder.group({
        part1: FormBuilder.group({
          subcategory,
          text: props.incident.text,
          image: true,
          note: '',
          priority: props.incident.priority.priority,
        }),
        part2: FormBuilder.group({
          subcategory,
          text: props.incident.text,
          image: true,
          note: '',
          priority: props.incident.priority.priority,
        }),
        part3: FormBuilder.group({
          subcategory,
          text: props.incident.text,
          image: true,
          note: '',
          priority: props.incident.priority.priority,
        }),
      })
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
  }

  setVisibility(isVisible) {
    this.setState({ isVisible });
  }

  handleSubmit() {
    const create = [];
    const update = [];
    const parts = ['part1', 'part2'];
    if (this.state.isVisible) {
      parts.push('part3');
    }

    parts.forEach((part) => {
      update.push(this.state.splitForm.value[part]);
      create.push({
        category: {
          sub_category: this.state.splitForm.value[part].subcategory
        },
        reuse_parent_image: this.state.splitForm.value[part].image,
        text: this.state.splitForm.value[part].text
      });
    });

    this.props.handleSubmit({
      id: this.props.incident.id,
      create,
      update
    });
  }

  render() {
    const { incident, attachments, subcategories, priorityList, handleCancel } = this.props;
    return (
      <div className="split-form">
        <StyledDisclaimer>
          Splitsen mag alleen als de oorspronkelijke melding over twee verschillende onderwerpen gaat, die zonder samenwerking met een andere afdeling kan worden afgehandeld.
        </StyledDisclaimer>

        <IncidentPart
          index="1"
          attachments={attachments}
          subcategories={subcategories}
          priorityList={priorityList}
          splitForm={this.state.splitForm}
        />

        <IncidentPart
          index="2"
          incident={incident}
          attachments={attachments}
          subcategories={subcategories}
          priorityList={priorityList}
          splitForm={this.state.splitForm}
        />

        {this.state.isVisible ?
          <div>
            <StyledRemoveButton
              variant="textButton"
              onClick={() => this.setVisibility(false)}
            >Verwijder</StyledRemoveButton>

            <IncidentPart
              index="3"
              incident={incident}
              attachments={attachments}
              subcategories={subcategories}
              priorityList={priorityList}
              splitForm={this.state.splitForm}
            />

          </div>
          :
          <StyledButton
            variant="primaryInverted"
            onClick={() => this.setVisibility(true)}
          >Deelmelding 3 toevoegen</StyledButton>
        }

        <StyledDisclaimer>
          <StyledHeading $as="h4">Let op</StyledHeading>
          <ul>
            <li>De persoon die de oorspronkelijke melding heeft gedaan, ontvangt een email per deelmelding.</li>
            <li>De oorspronkelijke melding wordt afgesloten als deze gesplitst wordt.</li>
            <li>Een melding kan maar 1 keer gesplitst worden.</li>
          </ul>
        </StyledDisclaimer>

        <div>
          <StyledButton
            variant="secondary"
            onClick={this.handleSubmit}
          >Splitsen</StyledButton>
          <StyledButton
            variant="primaryInverted"
            onClick={handleCancel}
          >Annuleer</StyledButton>
        </div>
      </div>
    );
  }
}

SplitForm.defaultProps = {
  incident: {
    category: {},
    priority: {
      priority: ''
    }
  },
  isVisible: false,
  subcategories: []
};

SplitForm.propTypes = {
  incident: PropTypes.object,
  attachments: PropTypes.array,
  isVisible: PropTypes.bool,
  subcategories: PropTypes.array,
  priorityList: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default SplitForm;
