import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';

class DeleteLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onDelete,
      title,
      addClassSlider
    } = this.props;

    return (
      <button type="button" onClick={onDelete} className={`deleteLink ${title ? 'withTitle' : ''} ${addClassSlider ? 'deleteSlider' : ''}`}>
        { (title) && (<p className="item-name">{title}</p>)}
        <div className="deleteLink-link" />
      </button>
    );
  }
}

DeleteLink.propTypes = {
  onDelete: PropTypes.func,
  title: PropTypes.string,
  addClassSlider: PropTypes.string
};


export default DeleteLink;
