/* eslint-disable no-use-before-define */
import { getFormValues } from 'redux-form';
import history from '../helpers/history';
import {
  SET_DATA_USERS_LIST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_DATA_USER_LIST_BY_ID,
  IS_EDIT_USER
} from '../constants/actions';
import {
  LISTUSERS_PATH,
  USER_API
} from '../constants/routes';
import {
  ALL
} from '../constants/strings';

// IS EDIT USER
// @param value is edit
export const isEditUser = (value) => {
  return {
    type: IS_EDIT_USER,
    payload: value
  };
};

// GET DATA USER LIST BY ORDER
// @param order
export const getDataUserListByOrderAlph = (order) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();

    const users = await fetch(`${USER_API}?sort=${order}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const usersResponse = await users.json();

    if (usersResponse.length > 0) {
      return dispatch(setDataUsersList(usersResponse, order));
    }
    return dispatch(setDataUsersList([], order));
  };
};

// GET DATA USER LIST SEARCH
// @param value of input
export const getDataUsersListSearch = (value) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      },
      usersListData: {
        statutFilter
      }
    } = getState();

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    const users = await fetch(`${USER_API}?search=${value}&sort=${filter}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const usersResponse = await users.json();

    if (usersResponse.length > 0) {
      return dispatch(setDataUsersList(usersResponse, filter));
    }
    return dispatch(setDataUsersList([], filter));
  };
};

// SET DATA USER LIST BY ID
// @param data
export const setDataUserListById = (data) => {
  return {
    type: SET_DATA_USER_LIST_BY_ID,
    payload: data
  };
};

// GET DATA LIST USER BY ID
// @param id of user
export const getDataListUserById = (id) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();

    const user = await fetch(`${USER_API}/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const userResponse = await user.json();

    if (userResponse) {
      return dispatch(setDataUserListById(userResponse));
    }
    return dispatch(setDataUserListById([]));
  };
};

// SET DATA USER LIST
// @param data & filter
export const setDataUsersList = (data, filter) => {
  return {
    type: SET_DATA_USERS_LIST,
    payload: {
      data,
      filter
    }
  };
};

// GET DATA LIST USERS$
export const getDataListUsers = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      },
      usersListData: {
        statutFilter
      }
    } = getState();

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    const users = await fetch(`${USER_API}?sort=${filter}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const usersResponse = await users.json();
    if (usersResponse.length > 0) {
      return dispatch(setDataUsersList(usersResponse, filter));
    }
    return dispatch(setDataUsersList([], filter));
  };
};

// DELETE USER
// @param id of user
export const deleteUser = id => async (dispatch, getState) => {
  const {
    usersData: {
      users: {
        token
      }
    }
  } = getState();

  return fetch(`${USER_API}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: {
          id
        }
      });
      history.push(LISTUSERS_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: DELETE_USER_ERROR,
        payload: error
      });
    }
  });
};

// ADD USER
export const addUser = () => async (dispatch, getState) => {
  const state = getState();
  const {
    usersData: {
      users: {
        token
      }
    }
  } = state;

  const user = getFormValues('UserValues')(state);

  return fetch(`${USER_API}/`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: response.body
      });
      history.push(LISTUSERS_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: ADD_USER_ERROR,
        payload: error
      });
    }
  });
};

// UPDATE USER
// @param id of user
export const updateUser = (userId) => async (dispatch, getState) => {
  const state = getState();

  const {
    usersData: {
      users: {
        token
      }
    }
  } = state;

  const user = getFormValues('UserValues')(state);

  const patchJson = {
    firstname: user.firstname,
    lastname: user.lastname,
    mail: user.mail
  };

  if ('password' in user && user.password !== '') {
    patchJson.password = user.password;
  }

  const response = await fetch(`${USER_API}/${userId}`,
    {
      body: JSON.stringify(patchJson),
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

  if (response.ok) {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: {
        user,
        userId
      }
    });
    history.push(LISTUSERS_PATH);
  } else {
    const error = await response.text();
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: error
    });
  }
};
