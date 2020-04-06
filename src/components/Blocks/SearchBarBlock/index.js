import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import '../../../styles/index.scss';

class SearchBarBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      type,
      placeholder,
      onChange
    } = this.props;

    return (
      <div className="searchBlock">
        <form className="search">
          <button className="search-button" type="submit" />
          <input type={type} placeholder={placeholder} className="search-input" onChange={onChange} />
        </form>
      </div>
    );
  }
}

SearchBarBlock.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchBarBlock;
