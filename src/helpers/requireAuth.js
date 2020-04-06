import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from 'react-cookies';
import {
  APP_PATH
} from '../constants/routes';
import { COOKIES_AUTHORIZATION_TOKEN } from '../constants/actions';


const requireAuth = (ComponentForRender) => {
  class AuthenticatedComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        authenticated: false
      };

      this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentWillMount() {
      this.hasAuthenticationToken();
    }

    redirectToLogin() {
      const { location, history } = this.props;
      const redirect = location.pathname + location.search;

      cookie.remove(COOKIES_AUTHORIZATION_TOKEN, { path: '/' });
      history.push(`${APP_PATH}?redirect=${redirect}`);
    }

    async hasAuthenticationToken() {
      const authCookie = cookie.load(COOKIES_AUTHORIZATION_TOKEN);

      if (authCookie) {
        return this.setState({ authenticated: true });
      }

      this.redirectToLogin();
      return this.setState({ authenticated: false });
    }

    render() {
      const { authenticated } = this.state;

      if (authenticated) {
        return (
          <ComponentForRender {...this.props} />
        );
      }

      return null;
    }
  }

  AuthenticatedComponent.propTypes = {
    location: PropTypes.shape({}),
    history: PropTypes.shape({}),
    checkAuthorization: PropTypes.func
  };

  const mapStateToProps = () => {
    return {};
  };

  const mapDispatchToProps = () => {
    return {};
  };

  const connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthenticatedComponent);

  return withRouter(connectedComponent);
};

export default requireAuth;
