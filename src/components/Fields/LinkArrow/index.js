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
      to
    } = this.props;
    return (
      <div className="arrow-back">
        <Link to={to} />
      </div>
    );
  }
}

LinkField.propTypes = {
  to: PropTypes.string
};


export default LinkField;
