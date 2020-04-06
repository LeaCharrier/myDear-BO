import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
import PropTypes from 'prop-types';
import ServiceProviderFormBlock from '../../Blocks/FormsBlock/ServiceProviderFormBlock';
import {
  isEditServiceProvider,
  getDataListServiceProviderById
} from '../../../actions/serviceProviders';
import {
  isEditProfil
} from '../../../actions/user';

class FormServiceProviderPage extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentWillMount() {
    const {
      id,
      serviceProviderById,
      editServiceProvider,
      editProfil,
      history: {
        location: {
          pathname
        }
      }
    } = this.props;

    const params = pathname.split('/');

    if (params.length === 4) {
      serviceProviderById(id);
      editServiceProvider('true');
    } else {
      editServiceProvider('false');
    }
    editProfil('false');
  }

  render() {
    const {
      role
    } = this.props;

    if (role === 'serviceProvider') {
      return null;
    }

    return (
      <div className="updateServiceProvider container">
        <ServiceProviderFormBlock />
      </div>
    );
  }
}

FormServiceProviderPage.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({}),
  serviceProviderById: PropTypes.func,
  editServiceProvider: PropTypes.func,
  editProfil: PropTypes.func,
  history: PropTypes.shape({}),
  role: PropTypes.string
};

const mapStateToProps = (state) => {
  const {
    usersData: {
      users: {
        role
      }
    },
    serviceProvidersListData: {
      serviceProviderById: serviceProvider
    }
  } = state;

  return {
    serviceProvider,
    role
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    serviceProviderById: (id) => dispatch(getDataListServiceProviderById(id)),
    editServiceProvider: (value) => dispatch(isEditServiceProvider(value)),
    editProfil: (value) => dispatch(isEditProfil(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormServiceProviderPage));
