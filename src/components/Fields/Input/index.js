import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import '../../../styles/index.scss';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      meta,
      type,
      placeholder,
      input
    } = this.props;

    return (
      <div>
        <div className="input">
          <input
            {...this.props}
            {...input}
            placeholder={placeholder}
            type={type}
          />
        </div>
        {meta.error && meta.touched && <span>{meta.error}</span>}
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string
};

export default Input;
