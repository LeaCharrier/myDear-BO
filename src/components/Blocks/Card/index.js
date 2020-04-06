/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';
import '../../../styles/index.scss';
import EditLink from '../../Fields/EditLink/index';
import DeleteLink from '../../Fields/DeleteLink/index';

class ItemRoomBlock extends Component {
  render() {
    const {
      data,
      onDelete,
      link,
      serviceProviders,
      type
    } = this.props;

    if (data && data.img) {
      var divStyle = {
        backgroundImage: 'url(' + data.img + ')',
      };
    } else {
      var divStyle = {
        backgroundImage: 'url(https://i.ibb.co/L9zLczz/userType.png)',
      };
    }

    if(type === 'users') {
      return (
        <div className="item" key={data.id}>
          <div className="itemContent">
            { (data && data.firstname && data.lastname) && (<p className="item-name">{data && data.firstname} {data && data.lastname}</p>)}
            <div className="item-links">
              <EditLink to={link} />
              <DeleteLink onDelete={onDelete} />
            </div>
          </div>
        </div>
      )
    }

    if(type === 'serviceProvider') {
      return (
        <div className="item" key={data.id}>
          <div className="itemContent">
            <div className="imgUser" style={divStyle} />
            { (data && data.firstname && data.lastname) && (<p className="item-name">{data && data.firstname} {data && data.lastname}</p>)}
            <div className="item-links">
              <EditLink to={link} />
              <DeleteLink onDelete={onDelete} />
            </div>
          </div>
        </div>
      )
    }

    if(type === 'tags') {
      return (
        <div className="item" key={data.id}>
          <div className="itemContent">
            { (data && data.tagName) && (<p className="item-name">{data && data.tagName}</p>)}
            { (data && data.categoryName) && (<p className="item-name">{data && data.categoryName}</p>)}
            <div className="item-links">
              <EditLink to={link} />
              <DeleteLink onDelete={onDelete} />
            </div>
          </div>
        </div>
      )
    }

    if(type === 'room') {
      if (data && data.price) {
        var serviceProvider = serviceProviders.filter(item => item.id === data.serviceProviderId.id);
      };
      return (
        <div className="item" key={data.id}>
          { (data && data.images && data.images.small && data.images.small) && (<img className="imgFull" src={data && data.images && data.images.small} />)}
          <div className="itemContent">
            { (data && data.title) && (<p className="item-name">{data.title}</p>) }
            { (data && data.price && data.price.room) && (<p>{ data.price.room }</p>)}
            {/* { (data && serviceProvider && serviceProvider[0].firstname  && serviceProvider[0].lastname) && (<p>Par {serviceProvider[0].firstname} {serviceProvider[0].lastname}</p>)} */}
            <div className="item-links">
              <EditLink to={link} />
              <DeleteLink onDelete={onDelete} />
            </div>
          </div>
        </div>
      )
    }
  }
}

ItemRoomBlock.propTypes = {
  data: PropTypes.shape({}),
  onDelete: PropTypes.func,
  link: PropTypes.string,
  type: PropTypes.string
};

const mapStateToProps = (state) => {
  const {
    serviceProvidersListData: {
      serviceProviders
    }
  } = state;

  return {
    serviceProviders
  };
};

export default connect(mapStateToProps, null)(ItemRoomBlock);
