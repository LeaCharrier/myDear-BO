import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../Layout/BaseLayout';
import FormProfilPage from '../../Pages/FormProfilPage/index';

const FormProfilPageWithLayout = () => (
  <BaseLayout>
    <FormProfilPage />
  </BaseLayout>
);

FormProfilPageWithLayout.propTypes = {
  match: PropTypes.shape({})
};

export default FormProfilPageWithLayout;
