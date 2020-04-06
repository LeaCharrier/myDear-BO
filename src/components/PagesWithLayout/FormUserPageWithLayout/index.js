import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../Layout/BaseLayout';
import FormUserPage from '../../Pages/FormUserPage';

const FormUserPageWithLayout = ({ match: { params: { id } } }) => {
  return (
    <BaseLayout>
      <FormUserPage id={id} />
    </BaseLayout>
  );
};
FormUserPageWithLayout.propTypes = {
  match: PropTypes.shape({})
};

export default FormUserPageWithLayout;
