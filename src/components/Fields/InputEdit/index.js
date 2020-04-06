import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import '../../../styles/index.scss';

class InputEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      meta,
      type,
      placeholder,
      input,
      ismap
    } = this.props;

    return (
      <div>
        <div className={`inputEdit ${ismap === 'true' ? 'inputEdit-map' : ''}`}>
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

InputEdit.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  ismap: PropTypes.string
};


export default InputEdit;
