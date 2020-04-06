import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onAdd,
      onChange,
      title
    } = this.props;

    return (
      <button type="button" onClick={onAdd} onChange={onChange} className={`addButton ${title ? 'withTitle' : ''}`}>
        { (title) && (<p className="item-name">{title}</p>)}
        <div type="button" className="addButton-link" />
      </button>
    );
  }
}

AddButton.propTypes = {
  onAdd: PropTypes.func,
  onChange: PropTypes.func,
  title: PropTypes.string
};


export default AddButton;
