import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderAdminBlock from '../../Blocks/HeaderAdminBlock';
import './styles.scss';

class BaseLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className="base-layout">
        <HeaderAdminBlock />
        { children }
      </div>
    );
  }
}

BaseLayout.propTypes = {
  children: PropTypes.shape({})
};

export default BaseLayout;
