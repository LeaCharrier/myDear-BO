import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';

class EditLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      to
    } = this.props;

    return (
      <div className="editLink">
        <Link to={to} className="editLink-link" />
      </div>
    );
  }
}

EditLink.propTypes = {
  to: PropTypes.string
};


export default EditLink;
