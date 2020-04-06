import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
import PropTypes from 'prop-types';
import UserForm from '../../Blocks/FormsBlock/UserFormBlock';
import {
  isEditUser,
  getDataListUserById
} from '../../../actions/users';

class FormUserPage extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentWillMount() {
    const {
      id,
      userById,
      editUser,
      history: {
        location: {
          pathname
        }
      }
    } = this.props;

    const params = pathname.split('/');

    if (params.length === 4) {
      userById(id);
      editUser('true');
    } else {
      editUser('false');
    }
  }

  render() {
    const {
      role
    } = this.props;

    if (role === 'serviceProvider') {
      return null;
    }

    return (
      <div className="updateUser container">
        <UserForm />
      </div>
    );
  }
}

FormUserPage.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({}),
  userById: PropTypes.func,
  editUser: PropTypes.func,
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
    usersListData: {
      userById: user
    }
  } = state;

  return {
    user,
    role
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userById: (id) => dispatch(getDataListUserById(id)),
    editUser: (value) => dispatch(isEditUser(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormUserPage));
