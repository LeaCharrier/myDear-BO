/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import '../../../styles/index.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDataTagsListByCat } from '../../../actions/tags';
import { getDataUserListByOrderAlph } from '../../../actions/users';
import { getDataServiceProviderListByOrderAlph } from '../../../actions/serviceProviders';
import { getDataRoomListByOrderAlph } from '../../../actions/rooms';
import { getDataBookingListByStatut } from '../../../actions/booking';

class TabBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'all'
    };
  }

  onClickTags(item) {
    const { tagsListByCat } = this.props;
    this.setState({
      active: item
    });
    tagsListByCat(item);
  }

  onClickStatut(item) {
    const { bookingListByStatut } = this.props;
    this.setState({
      active: item
    });
    bookingListByStatut(item);
  }

  onClick(item, order) {
    const {
      getDataUserListOrder,
      getDataServiceProviderListOrder,
      getDataRoomListOrder
    } = this.props;

    if (item === 'users') {
      getDataUserListOrder(order);
    }

    if (item === 'serviceProvider') {
      getDataServiceProviderListOrder(order);
    }

    if (item === 'room') {
      getDataRoomListOrder(order);
    }
    this.setState({
      active: order
    });
  }

  render() {
    const {
      to,
      tagsCat,
      name,
      bookingStatut
    } = this.props;

    const {
      active
    } = this.state;

    if (name === 'booking') {
      return (
        <div className="tabOrder">
          <button onClick={() => this.onClickStatut('all')} type="button" className={active === 'all' ? 'isActive' : ''}>Tous</button>
          { bookingStatut && bookingStatut.map((item, key) => {
            return <button key={key} onClick={() => this.onClickStatut(item)} type="button" className={active === item ? 'isActive' : ''}>{item}</button>;
          })}
        </div>
      );
    }
    if (name !== 'tags') {
      return (
        <div className="tabOrder">
          <button onClick={() => this.onClick(name, 'all')} type="button" className={active === 'all' ? 'isActive' : ''}>Derniers inscrits</button>
          <button onClick={() => this.onClick(name, 'alphabetical')} type="button" className={active === 'alphabetical' ? 'isActive' : ''}>Par ordre alphabétique</button>
          <Link to={to} className="add" />
        </div>
      );
    }
    return (
      <div>
        <div className="tabOrder">
          <button onClick={() => this.onClickTags('all')} type="button" className={active === 'all' ? 'isActive' : ''}>Tous</button>
          { tagsCat && tagsCat.map((item, key) => {
            return <button key={key} onClick={() => this.onClickTags(item)} type="button" className={active === item ? 'isActive' : ''}>{item}</button>;
          })}
          <Link to={to} className="add" />
        </div>
      </div>
    );
  }
}

TabBlock.propTypes = {
  name: PropTypes.string,
  to: PropTypes.string,
  tagsCat: PropTypes.arrayOf(PropTypes.string),
  tagsListByCat: PropTypes.func,
  getDataUserListOrder: PropTypes.func,
  getDataServiceProviderListOrder: PropTypes.func,
  getDataRoomListOrder: PropTypes.func,
  bookingStatut: PropTypes.arrayOf(PropTypes.string),
  bookingListByStatut: PropTypes.func
};

const mapStateToProps = (state) => {
  const {
    tagsData: {
      tagsCat
    },
    bookingData: {
      bookingStatut
    }
  } = state;

  return {
    tagsCat,
    bookingStatut
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tagsListByCat: (item) => dispatch(getDataTagsListByCat(item)),
    getDataUserListOrder: (item) => dispatch(getDataUserListByOrderAlph(item)),
    getDataServiceProviderListOrder: (item) => dispatch(getDataServiceProviderListByOrderAlph(item)),
    getDataRoomListOrder: (item) => dispatch(getDataRoomListByOrderAlph(item)),
    bookingListByStatut: (item) => dispatch(getDataBookingListByStatut(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBlock);
