/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';
import Button from '../../Fields/Button/index';
import {
  TRUE_TEXT
} from '../../../constants/strings';
import {
  updateBooking
} from '../../../actions/booking';

class Booking extends Component {
  constructor(props) {
    super(props);
  }

  onClickAccept(id) {
    const {
      update
    } = this.props;

    update(id, 'Accepté');
  };

  onClickRefused(id) {
    const {
      update
    } = this.props;

    update(id, 'Refusé');
  };

  render() {
    const {
      data
    } = this.props;

    var divStyle = {
      backgroundImage: 'url(https://i.ibb.co/L9zLczz/userType.png)',
    };

    let imgSmall;
    if (data && data.img) {
      imgSmall = data.img;
    } else {
      imgSmall = 'https://i.ibb.co/GTFpkPJ/Artboard-Copy-8.png';
    }

    let statutText;
    if (data && data.statut === 'Accepté') {
      statutText = 'Annonce acceptée';
    }
    if (data && data.statut === 'Refusé') {
      statutText = 'Annonce refusée';
    }

    return (
      <div className={data.statut != 'En attente' ? `${data.statut} devisItem` : 'devisItem'}>
        <div className="devisItem-user">
          <div className="devisItem-user-infos">
            <div className="devisItem-user-img" style={divStyle} />
            {(data && data.userId[0] && data.userId[0].firstname && data.userId[0].lastname) && <p>{data.userId[0].firstname} {data.userId[0].lastname}</p>}
          </div>
          <div className="devisItem-user-description">{(data && data.msgUser) && <p>{data.msgUser}</p>}</div>
        </div>
        <p className="devisItem-title">{data.title}</p>
        <div className="devisItem-content">
          <div className="devisItem-content-infos">
          {data && data.recap.map((item, key) => (
            <div key={key} className="devisItem-content-text color">
              <p>{item.title}</p>
              <p>{item.info}</p>
            </div>
          ))}
          </div>
          <img src={imgSmall} />
        </div>

        <p className={data.statut != 'En attente' ? 'devisItem-statut' : 'hide'}>{statutText}</p>

        <div className={data.statut != 'En attente' ? 'hide' : 'devisItem-buttons'}>
          <Button text='ACCEPTER' onClick={() => this.onClickAccept(data.id)} isColor={TRUE_TEXT} />
          <Button text='REFUSER' onClick={() => this.onClickRefused(data.id)} />
        </div>
      </div>
    )
  }
}

Booking.propTypes = {
  data: PropTypes.shape({}),
  update: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (id, state) => dispatch(updateBooking(id, state))
  };
};

export default connect(null, mapDispatchToProps)(Booking);
