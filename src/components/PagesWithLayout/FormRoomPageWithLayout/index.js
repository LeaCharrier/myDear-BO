import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../Layout/BaseLayout';
import FormRoomPage from '../../Pages/FormRoomPage/index';

const FormRoomPageWithLayout = ({ match: { params: { id } } }) => (
  <BaseLayout>
    <FormRoomPage id={id} />
  </BaseLayout>
);

FormRoomPageWithLayout.propTypes = {
  match: PropTypes.shape({})
};

export default FormRoomPageWithLayout;
