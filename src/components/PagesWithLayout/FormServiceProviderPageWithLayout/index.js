import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../Layout/BaseLayout';
import FormServiceProviderPage from '../../Pages/FormServiceProviderPage';

const FormServiceProviderPageWithLayout = ({ match: { params: { id } } }) => (
  <BaseLayout>
    <FormServiceProviderPage id={id} />
  </BaseLayout>
);

FormServiceProviderPageWithLayout.propTypes = {
  match: PropTypes.shape({})
};

export default FormServiceProviderPageWithLayout;
