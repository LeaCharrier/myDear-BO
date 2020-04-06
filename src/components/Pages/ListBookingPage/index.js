import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import './styles.scss';
import '../../../styles/index.scss';
import Booking from '../../Blocks/Booking/index';
import {
  getDataListBooking,
  getDataBookingStatut,
  getDataBookingListSearch
} from '../../../actions/booking';
import TabBlock from '../../Blocks/TabBlock/index';
import {
  SERVICE_PROVIDER_UPDATE_PATH
} from '../../../constants/routes';
import SearchBarBlock from '../../Blocks/SearchBarBlock/index';

class ListBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const {
      bookingListData,
      bookingNameStatut
    } = this.props;

    bookingNameStatut();
    bookingListData();
  }

  onChange(value) {
    const {
      bookingListSearch
    } = this.props;

    bookingListSearch(value);
  }

  render() {
    const {
      booking,
      role,
      id
    } = this.props;

    if (!booking) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
        />
      );
    }

    if (booking && booking.length === 0) {
      return (
        <div className="container notFoundContent">
          {(role === 'administrator') && (<Link className="listBookings-link" to={`${SERVICE_PROVIDER_UPDATE_PATH}/${id}`}> ← Retourner sur la fiche du prestataire</Link>)}
          <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
          <TabBlock isButton="false" name="booking" />
          <div className="notFound">
            <p>Il n’y a aucun résultat à afficher</p>
          </div>
        </div>
      );
    }
    return (
      <div className="listBookings container">
        {(role === 'administrator') && (<Link className="listBookings-link" to={`${SERVICE_PROVIDER_UPDATE_PATH}/${id}`}> ← Retourner sur la fiche du prestataire</Link>)}
        <SearchBarBlock type="text" placeholder="Rechercher..." onChange={(event) => this.onChange(event.target.value)} />
        <TabBlock isButton="false" name="booking" />
        {booking && booking.map((item, key) => (
          <Booking key={key} data={item} />
        ))}
      </div>
    );
  }
}

ListBooking.propTypes = {
  bookingListData: PropTypes.func,
  booking: PropTypes.arrayOf(PropTypes.shape({})),
  bookingNameStatut: PropTypes.func,
  role: PropTypes.string,
  id: PropTypes.string,
  bookingListSearch: PropTypes.func
};

const mapStateToProps = (state) => {
  const {
    usersData: {
      users: {
        role
      }
    },
    bookingData: {
      booking
    },
    serviceProvidersListData: {
      serviceProviderById: {
        id
      }
    }
  } = state;

  return {
    booking,
    role,
    id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookingListData: () => dispatch(getDataListBooking()),
    bookingNameStatut: () => dispatch(getDataBookingStatut()),
    bookingListSearch: (value) => dispatch(getDataBookingListSearch(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBooking);
