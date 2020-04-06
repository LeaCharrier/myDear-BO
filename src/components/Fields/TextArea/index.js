import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import '../../../styles/index.scss';

class TextArea extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      type,
      placeholder,
      input
    } = this.props;
    return (
      <div className="textArea">
        <textarea
          {...this.props}
          {...input}
          placeholder={placeholder}
          type={type}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string
};


export default TextArea;
