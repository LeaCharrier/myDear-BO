import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../Layout/BaseLayout';
import FormTagsPage from '../../Pages/FormTagsPage';

const FormTagsPageWithLayout = ({ match: { params: { id } } }) => {
  return (
    <BaseLayout>
      <FormTagsPage id={id} />
    </BaseLayout>
  );
};

FormTagsPageWithLayout.propTypes = {
  match: PropTypes.shape({})
};

export default FormTagsPageWithLayout;
