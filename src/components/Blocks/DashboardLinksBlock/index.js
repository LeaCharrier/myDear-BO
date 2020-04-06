import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import { HEADER_NAV } from '../../../constants/values';

class DashboardLinksBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      users
    } = this.props;

    const nav = HEADER_NAV.filter(item => item && item.role && item.role === (users && users.role));

    if (users === undefined || users.role == null) {
      return (
        null
      );
    }

    return (
      <div className={users && users.role === 'administrator' ? 'dashboardLink' : 'dashboardLink dashboardLink-service'}>
        {
          nav.map((item, i) => {
            return (
              <div className="dashboardLink-item" key={i}>
                <NavLink to={item.url} activeClassName="active">
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                </NavLink>
              </div>
            );
          })
        }
      </div>
    );
  }
}

DashboardLinksBlock.propTypes = {
  users: PropTypes.shape({})
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

export default connect(mapStateToProps, null)(DashboardLinksBlock);
