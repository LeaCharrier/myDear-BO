import React, { Component } from 'react';
import './styles.scss';
import '../../../styles/index.scss';
import { Link } from 'react-router-dom';

import {
  DASHBOARD_PATH
} from '../../../constants/routes';

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="notFoundPage container">
        <img src="https://i.ibb.co/pvzpX2c/logo-black.png" alt="logo" className="notFoundPage-img" />
        <p className="notFoundPage-text">Oups… La page demandée n’existe pas :(</p>
        <Link to={DASHBOARD_PATH}> Retourner sur la home </Link>
      </div>
    );
  }
}

export default NotFoundPage;
