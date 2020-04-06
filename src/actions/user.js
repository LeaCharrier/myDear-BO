import cookie from 'react-cookies';
import history from '../helpers/history';
import {
  SET_DATA_USERS,
  COOKIES_AUTHORIZATION_TOKEN,
  SET_LOGOUT_USER,
  IS_EDIT_PROFIL,
  LOGIN_ERROR
} from '../constants/actions';
import {
  DASHBOARD_PATH,
  APP_PATH,
  LISTROOMS_PATH,
  LOGIN_API
} from '../constants/routes';
import {
  TYPE_ADMIN
} from '../constants/strings';

export const setLogoutUser = () => {
  return {
    type: SET_LOGOUT_USER,
    payload: {}
  };
};

export const setDataUsers = (data) => {
  return {
    type: SET_DATA_USERS,
    payload: data
  };
};

export const getLogoutUser = () => {
  return dispatch => {
    dispatch(setLogoutUser());

    history.push(APP_PATH);
  };
};

export const isEditProfil = (value) => {
  return {
    type: IS_EDIT_PROFIL,
    payload: value
  };
};

export const getDataUsers = (username, password) => {
  return async (dispatch) => {
    const users = await fetch(`${LOGIN_API}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (users.ok) {
      const usersResponse = await users.json();
      dispatch(setDataUsers(Object.assign({}, usersResponse.user)));
      cookie.save(COOKIES_AUTHORIZATION_TOKEN, usersResponse.user.token, { maxAge: 3600 * 3 });

      if (usersResponse.user.role === TYPE_ADMIN) {
        history.push(DASHBOARD_PATH);
      } else {
        history.push(LISTROOMS_PATH);
      }
    } else {
      const error = await users.text();
      dispatch({
        type: LOGIN_ERROR,
        payload: error
      });
      history.push(APP_PATH);
    }
  };
};
