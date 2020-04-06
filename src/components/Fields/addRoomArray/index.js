import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import InputEdit from '../InputEdit';
import DeleteLink from '../DeleteLink';
import AddButton from '../AddButton';
import {
  TEXT_TYPE,
  FALSE_TEXT
} from '../../../constants/strings';

import './styles.scss';

const renderRooms = ({ fields }) => (
  <div>
    <div className="arrayRoom">
      <h2 className="contain-form-title">Salles</h2>
      <AddButton
        title="Ajouter une salle"
        onAdd={() => fields.push()}
      />
    </div>
    <ul>
      {fields.map((room, index) => (
        <li key={index}>
          <DeleteLink
            title="Supprimer la salle"
            onDelete={() => fields.remove(index)}
          />
          <Field
            name={`${room}.name`}
            component={InputEdit}
            placeholder="Salle de la meunerie"
            ismap={FALSE_TEXT}
            type={TEXT_TYPE}
          />
          <Field
            name={`${room}.peopleCapacity`}
            component={InputEdit}
            placeholder="180 pers"
            ismap={FALSE_TEXT}
            type={TEXT_TYPE}
          />
          <Field
            name={`${room}.size`}
            component={InputEdit}
            placeholder="128 m²"
            ismap={FALSE_TEXT}
            type={TEXT_TYPE}
          />
        </li>))}
    </ul>
  </div>
);

renderRooms.propTypes = {
  fields: PropTypes.shape({})
};

export default renderRooms;
