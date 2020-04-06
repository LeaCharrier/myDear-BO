import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';

class LinkField extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      to,
      text
    } = this.props;
    return (
      <div className="link">
        <Link to={to}>{text}</Link>
      </div>
    );
  }
}

LinkField.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string
};


export default LinkField;
