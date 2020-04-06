import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
import PropTypes from 'prop-types';
import ServiceProviderFormBlock from '../../Blocks/FormsBlock/ServiceProviderFormBlock';
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
      editProfil
    } = this.props;
    editProfil('true');
  }

  render() {
    return (
      <div className="updateServiceProvider container">
        <ServiceProviderFormBlock />
      </div>
    );
  }
}

FormServiceProviderPage.propTypes = {
  editProfil: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfil: (value) => dispatch(isEditProfil(value))
  };
};

export default connect(null, mapDispatchToProps)(withRouter(FormServiceProviderPage));
