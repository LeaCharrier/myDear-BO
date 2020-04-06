import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';
import Button from '../../Fields/Button/index';
import {
  TRUE_TEXT,
  OUI_TEXT,
  NON_TEXT
} from '../../../constants/strings';
import {
  setServiceId,
  setServiceProviderId
} from '../../../actions/modal';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      id,
      onSubmit,
      setId,
      serviceProviderId,
      setServiceProvider
    } = this.props;

    setId(id);
    setServiceProvider(serviceProviderId);
    onSubmit();
  }

  render() {
    const {
      open,
      message,
      onCancel
    } = this.props;

    if (open) {
      return (
        <div className="modal">
          <div className="modal-content">
            <p>{message}</p>
            <div className="modal-content-button">
              <Button text={OUI_TEXT} onClick={this.handleClick} isColor={TRUE_TEXT} />
              <Button text={NON_TEXT} onClick={onCancel} />
            </div>
            <button type="submit" onClick={onCancel} className="cross">
              <i />
            </button>
          </div>
        </div>
      );
    }

    return null;
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  onCancel: PropTypes.func,
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  setId: PropTypes.func,
  serviceProviderId: PropTypes.string,
  setServiceProvider: PropTypes.func
};


const mapDispatchToProps = (dispatch) => {
  return {
    setId: (id) => dispatch(setServiceId(id)),
    setServiceProvider: (id) => dispatch(setServiceProviderId(id))
  };
};

export default connect(null, mapDispatchToProps)(Modal);
