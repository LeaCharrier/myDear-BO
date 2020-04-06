/* eslint-disable*/
import { getFormValues } from 'redux-form';
import history from '../helpers/history';
import uniq from 'lodash/uniq';
import {
  SET_DATA_ROOMS_LIST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_ERROR,
  UPDATE_ROOM_SUCCESS,
  IS_EDIT_ROOM,
  SET_DATA_ROOMS_LIST_BY_ID,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_ERROR,
  UPDATE_ROOM_ERROR,
  UPDATE_DATA_CAROUSEL,
  SET_DATA_ROOMS_LIST_SERVICE_PROVIDER,
  UPDATE_IMAGES_TO_UPLOAD
} from '../constants/actions';
import {
  LISTROOMS_PATH,
  SERVICE_API
} from '../constants/routes';
import {
  TYPE_ADMIN,
  ALL
} from '../constants/strings';


// IS EDIT ROOM
// @param value is edit
export const isEditRoom = (value) => {
  return {
    type: IS_EDIT_ROOM,
    payload: value
  };
};

// GET DATA LIST ROOM SEARCH
// @param value of input
export const getDataRoomsListSearch = (value) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      },
      roomsListData: {
        statutFilter
      }
    } = getState();

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    const rooms = await fetch(`${SERVICE_API}?search=${value}&sort=${filter}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const roomsResponse = await rooms.json();

    if (roomsResponse.length > 0) {
      return dispatch(setDataRoomsList(roomsResponse, filter));
    }
    return dispatch(setDataRoomsList([], filter));
  };
};

// GET DATA LIST BY ORDER
// @param order
export const getDataRoomListByOrderAlph = (order) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token,
          role,
          id
        }
      }
    } = getState();

    let rooms;

    rooms = await fetch(`${SERVICE_API}?sort=${order}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const roomsResponse = await rooms.json();

    if (roomsResponse.length > 0) {
      if (role === TYPE_ADMIN) {
        return dispatch(setDataRoomsList(roomsResponse, order));
      }
      return dispatch(setDataRoomsListByServiceProvider(roomsResponse, id, order));
    }
    return dispatch(setDataRoomsList([], order));
  };
};

// UPDATE IMAGE UPLOAD
export const updateImagesToUpload = data => ({
  type: UPDATE_IMAGES_TO_UPLOAD,
  payload: data
})

// UPDATE CAROUSEL
export const updateDataCarousel = (data) => {
  return {
    type: UPDATE_DATA_CAROUSEL,
    payload: data
  };
};

// SET DATA ROOMS LIST
// @param data
export const setDataRoomsList = (data, filter) => {
  return {
    type: SET_DATA_ROOMS_LIST,
    payload: {
      data,
      filter
    }
  };
};

// SET DATA ROOMS LIST BY SERVICEPROVIDER
// @param data & id of serviceProvider
export const setDataRoomsListByServiceProvider = (data, id, filter) => {
  return {
    type: SET_DATA_ROOMS_LIST_SERVICE_PROVIDER,
    payload: {
      data,
      id,
      filter
    }
  };
};

// SET DATA ROOMS LIST BY ID
// @param data
export const setDataRoomsListById = (data) => {
  const {
    images: {
      carousel
    }
  } = data;

  return {
    type: SET_DATA_ROOMS_LIST_BY_ID,
    payload: {
      data,
      carousel
    }
  };
};

// UPDATE ROOM
// @param roomId & pictures
export const updateRoom = (roomId, pictures) => async (dispatch, getState) => {
  const {
    usersData: {
      users: {
        token
      }
    },
    roomsListData: {
      carousel,
      imagesToUpload
    }
  } = getState();

  const room = getFormValues('RoomValues')(getState());

  room.serviceProviderId = room.serviceProviderId.id;
  room.tags = [...room.equipments.map(({ id }) => id), ...room.tags.map(({ id }) => id)];
  room.reviews = room.reviews.map(({ id }) => id);
  room.booking = room.booking.map(({ id }) => id);
  room.dormitory.capacityDormitory[0].bedAvailability = parseInt(room.dormitory.capacityDormitory[0].bedAvailability, 10);
  room.dormitory.capacityDormitory[1].bedAvailability = parseInt(room.dormitory.capacityDormitory[1].bedAvailability, 10);
  room.zipcode = parseInt(room.zipcode, 10);

  const formData = new FormData();

  formData.append('json', JSON.stringify(room));

  carousel.forEach(elem => formData.append('images.carousel', elem));
  const imagesUpload = uniq(imagesToUpload);
  imagesUpload.forEach(elem => formData.append('images.carousel', elem));
  formData.append('images.small', pictures[0]);


  const response = await fetch(`${SERVICE_API}/${roomId}`, {
    body: formData,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.ok) {
    dispatch({
      type: UPDATE_ROOM_SUCCESS
    });
    dispatch(getDataListRooms());
    history.push(LISTROOMS_PATH);
  } else {
    const error = await response.text();
    dispatch({
      type: UPDATE_ROOM_ERROR,
      payload: error
    });
  }

  return null;
};

// DELETE ROOM
// @param roomId
export const deleteRoom = (roomId) => async (dispatch, getState) => {
  const {
    usersData: {
      users: {
        token
      }
    }
  } = getState();

  return fetch(`${SERVICE_API}/${roomId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: DELETE_ROOM_SUCCESS,
        payload: {
          roomId
        }
      });
      dispatch(getDataListRooms());
      history.push(LISTROOMS_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: DELETE_ROOM_ERROR,
        payload: error
      });
    }
  });
};

// GET DATA LIST ROOMS
export const getDataListRooms = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token,
          role,
          id
        }
      },
      roomsListData: {
        statutFilter
      }
    } = getState();
    const rooms = await fetch(`${SERVICE_API}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    const roomsResponse = await rooms.json();

    if (roomsResponse.length > 0) {
      if (role === TYPE_ADMIN) {
        return dispatch(setDataRoomsList(roomsResponse, filter));
      }
      return dispatch(setDataRoomsListByServiceProvider(roomsResponse, id, filter));
    }
    return dispatch(setDataRoomsList([], filter));
  };
};

// GET DATA LIST ROOM BY ID
// @param id
export const getDataListRoombyId = (id) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();
    const rooms = await fetch(`${SERVICE_API}/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const roomsResponse = await rooms.json();

    if (roomsResponse) {
      return dispatch(setDataRoomsListById(roomsResponse));
    }
    return dispatch(setDataRoomsListById([]));
  };
};

// ADD ROOM
// @param pictures
export const addRoom = (pictures) => async (dispatch, getState) => {
  const state = getState();
  const {
    usersData: {
      users: {
        token,
        id: idUser
      }
    },
    roomsListData: {
      carousel,
      imagesToUpload
    }
  } = state;

  const room = getFormValues('RoomValues')(state);

  room.serviceProviderId = idUser;
  room.tags = [...room.equipments.map(({ id }) => id), ...room.tags.map(({ id }) => id)];
  room.zipcode = parseInt(room.zipcode, 10);
  room.dormitory.capacityDormitory[0].bedAvailability = parseInt(room.dormitory.capacityDormitory[0].bedAvailability, 10);
  room.dormitory.capacityDormitory[1].bedAvailability = parseInt(room.dormitory.capacityDormitory[1].bedAvailability, 10);

  const formData = new FormData();
  formData.append('json', JSON.stringify(room));

  carousel.forEach(elem => formData.append('images.carousel', elem));
  const imagesUpload = uniq(imagesToUpload);
  imagesUpload.forEach(elem => formData.append('images.carousel', elem));
  formData.append('images.small', pictures[0]);

  return fetch(`${SERVICE_API}/`, {
    body: formData,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: ADD_ROOM_SUCCESS,
        payload: response.body
      });
      history.push(LISTROOMS_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: ADD_ROOM_ERROR,
        payload: error
      });
    }
  });
};
