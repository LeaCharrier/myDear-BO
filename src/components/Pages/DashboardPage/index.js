import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import './styles.scss';
import '../../../styles/index.scss';
import AnalyticsBlock from '../../Blocks/AnalyticsBlock/index';
import AnalyticsNumberBlock from '../../Blocks/AnalyticsNumberBlock/index';
import { getDataDashboard } from '../../../actions/dashboard';


class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { getDataDashboardList } = this.props;
    getDataDashboardList();
  }

  render() {
    const {
      role,
      stats,
      bookings
    } = this.props;

    if (role === 'serviceProvider') {
      return null;
    }

    if (!stats) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
        />
      );
    }

    return (
      <div className="dashboardAnalytics container">
        {stats && stats
          .map((item, key) => (
            <AnalyticsBlock key={key} data={item} />
          ))
        }
        <AnalyticsNumberBlock title="Devis signé" data={bookings} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  role: PropTypes.string,
  getDataDashboardList: PropTypes.func,
  stats: PropTypes.arrayOf(PropTypes.shape({})),
  bookings: PropTypes.shape({})
};

const mapStateToProps = (state) => {
  const {
    usersData: {
      users: {
        role
      }
    },
    dashboardData: {
      dashboard: {
        stats,
        bookings
      }
    }
  } = state;

  return {
    role,
    stats,
    bookings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataDashboardList: () => dispatch(getDataDashboard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
