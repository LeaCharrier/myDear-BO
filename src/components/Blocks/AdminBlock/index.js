/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import { getLogoutUser } from '../../../actions/user';
import EditLink from '../../Fields/EditLink/index';
import { PROFIL_EDIT } from '../../../constants/routes';

class AdminBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const {
      users,
      id
    } = this.props;

    if (users && users.img) {
      var styles = {
        backgroundImage: `url(${users.img})`
      };
    } else {
      var styles = {
        backgroundImage: 'url(https://i.ibb.co/L9zLczz/userType.png)'
      };
    }

    if (users && users.role == null) {
      return (
        null
      );
    }

    return (
      <div className="admin">
        <div className="admin-content">
          <div style={styles} alt={users && users.username} className="admin-picture" />
          <div className="admin-infos">
            <p className="admin-infos-name">{users && users.username}</p>
            <p className="admin-infos-role">{users && users.role}</p>
            <div className="contain-button">
              <button type="submit" onClick={() => this.logout()} className="admin-deco" />
              <EditLink to={`${PROFIL_EDIT}/${id}`} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

AdminBlock.propTypes = {
  users: PropTypes.shape({}),
  picture: PropTypes.string,
  logoutUser: PropTypes.func,
  id: PropTypes.string
};

const mapStateToProps = (state) => {
  const {
    usersData: {
      users
    }
  } = state;

  return {
    users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(getLogoutUser())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminBlock);
