import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      text,
      isColor,
      onClick
    } = this.props;
    return (
      <button onClick={onClick} className={`btn ${isColor ? 'btn-color' : ''}`} type="submit">{text}</button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  isColor: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
