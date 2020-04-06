/* eslint-disable no-use-before-define */
import { getFormValues } from 'redux-form';
import uniq from 'lodash/uniq';
import history from '../helpers/history';
import {
  IS_EDIT_TAG,
  SET_DATA_TAGS_LIST,
  SET_DATA_TAG_LIST_BY_ID,
  ADD_TAG_SUCCESS,
  ADD_TAG_ERROR,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_ERROR,
  UPDATE_TAG_SUCCESS,
  SET_DATA_EQUIPMENTS_LIST,
  SET_DATA_ROOM_LIST,
  UPDATE_TAG_ERROR,
  SET_DATA_TAGS_CAT
} from '../constants/actions';
import {
  TAGS_PATH,
  TAG_API
} from '../constants/routes';
import {
  ALL
} from '../constants/strings';

// GET DATA TAGS LIST SEARCH
// @param value of input
export const getDataTagsListSearch = (value) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      },
      tagsData: {
        statutFilter
      }
    } = getState();

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    const tags = await fetch(`${TAG_API}?search=${value}&sort=${filter}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const tagsResponse = await tags.json();

    if (tagsResponse.length > 0) {
      return dispatch(setDataTagsList(tagsResponse, filter));
    }
    return dispatch(setDataTagsList([], filter));
  };
};

// GET DATA TAGS LIST BY CAT
// @param item of cat
export const getDataTagsListByCat = (item) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();

    const tags = await fetch(`${TAG_API}?sort=${item}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const tagsResponse = await tags.json();

    if (tagsResponse.length > 0) {
      return dispatch(setDataTagsList(tagsResponse, item));
    }
    return dispatch(setDataTagsList([], item));
  };
};

// SET DATA TAGS LIST
// @param data
export const setDataTagsList = (data, filter) => {
  return {
    type: SET_DATA_TAGS_LIST,
    payload: {
      data,
      filter
    }
  };
};

// IS EDIT TAG
// @param value is edit
export const isEditTag = (value) => {
  return {
    type: IS_EDIT_TAG,
    payload: value
  };
};

// SET DATA TAGS CAT
// @param data
export const setDataTagsCat = (data) => {
  return {
    type: SET_DATA_TAGS_CAT,
    payload: data
  };
};

// SET DATA TAGS EQUIPMENT LIST
// @param data
export const setDataEquipmentsList = (data) => {
  return {
    type: SET_DATA_EQUIPMENTS_LIST,
    payload: data
  };
};

// SET DATA TAGS ROOM LIST
// @param data
export const setDataTagsRoomList = (data) => {
  return {
    type: SET_DATA_ROOM_LIST,
    payload: data
  };
};

// SET DATA TAG LIST BY ID
// @param data
export const setDataTagListById = (data) => {
  return {
    type: SET_DATA_TAG_LIST_BY_ID,
    payload: data
  };
};

// GET DATA LIST TAG BY ID
// @param id of tag
export const getDataListTagById = (id) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();

    const tag = await fetch(`${TAG_API}/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const tagResponse = await tag.json();

    if (tagResponse) {
      return dispatch(setDataTagListById(tagResponse));
    }
    return dispatch(setDataTagListById([]));
  };
};

// GET DATA LIST TAGS
export const getDataListTags = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      },
      tagsData: {
        statutFilter
      }
    } = getState();
    const tags = await fetch(`${TAG_API}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = 'all';
    } else {
      filter = statutFilter;
    }

    const tagsResponse = await tags.json();

    if (tagsResponse.length > 0) {
      return dispatch(setDataTagsList(tagsResponse, filter));
    }
    return dispatch(setDataTagsList([], filter));
  };
};

// GET DATA TAGS CAT
export const getDataTagsCat = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();
    const tags = await fetch(`${TAG_API}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const tagsResponse = await tags.json();
    const allCatName = tagsResponse.map((item) => item.categoryName);
    const tagsCat = uniq(allCatName);

    if (tagsCat.length > 0) {
      return dispatch(setDataTagsCat(tagsCat));
    }
    return dispatch(setDataTagsCat([]));
  };
};

// GET DATA LIST TAGS ROOM
export const getDataListTagsRoom = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users
      }
    } = getState();
    const tags = await fetch(`${TAG_API}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${users && users.token}`
      }
    });

    const tagsResponse = await tags.json();
    const tagsRoomList = tagsResponse.filter(item => item.categoryName !== 'equipments');

    if (tagsResponse.length > 0) {
      return dispatch(setDataTagsRoomList(tagsRoomList));
    }
    return dispatch(setDataTagsRoomList([]));
  };
};

// GET DATA LIST EQUIPMENTS
export const getDataListEquipments = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users
      }
    } = getState();
    const tags = await fetch(`${TAG_API}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${users && users.token}`
      }
    });

    const tagsResponse = await tags.json();
    const equipmentsList = tagsResponse.filter(item => item.categoryName === 'equipments');

    if (equipmentsList.length > 0) {
      return dispatch(setDataEquipmentsList(equipmentsList));
    }
    return dispatch(setDataEquipmentsList([]));
  };
};

// UPDATE TAG
// @param tagId
export const updateTag = (tagId) => async (dispatch, getState) => {
  const {
    usersData: {
      users
    }
  } = getState();

  const tag = getFormValues('TagValues')(getState());

  const response = await fetch(`${TAG_API}/${tagId}`,
    {
      body: JSON.stringify(tag),
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${users && users.token}`
      }
    });

  if (response.ok) {
    dispatch({
      type: UPDATE_TAG_SUCCESS
    });
    dispatch(getDataListTags());
    history.push(TAGS_PATH);
  } else {
    const error = await response.text();
    dispatch({
      type: UPDATE_TAG_ERROR,
      payload: error
    });
  }

  return null;
};

// DELETE TAG
// @param tagId
export const deleteTag = (tagId) => async (dispatch, getState) => {
  const {
    usersData: {
      users
    }
  } = getState();

  return fetch(`${TAG_API}/${tagId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${users && users.token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: DELETE_TAG_SUCCESS,
        payload: {
          tagId
        }
      });
      dispatch(getDataListTags());
      history.push(TAGS_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: DELETE_TAG_ERROR,
        payload: error
      });
    }
  });
};

// ADD TAG
export const addTag = () => async (dispatch, getState) => {
  const state = getState();
  const {
    usersData: {
      users
    }
  } = state;

  const tag = getFormValues('TagValues')(state);

  return fetch(`${TAG_API}/`, {
    method: 'POST',
    body: JSON.stringify(tag),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${users && users.token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: ADD_TAG_SUCCESS,
        payload: response.body
      });
      history.push(TAGS_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: ADD_TAG_ERROR,
        payload: error
      });
    }
  });
};
