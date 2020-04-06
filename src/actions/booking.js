/* eslint-disable no-use-before-define */
import uniq from 'lodash/uniq';
import {
  SET_DATA_BOOKING_LIST,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_ERROR,
  SET_DATA_BOOKING_STATUT
} from '../constants/actions';
import {
  TYPE_ADMIN,
  ALL
} from '../constants/strings';
import {
  SERVICEPROVIDER_API,
  BOOKING_PATH,
  BOOKING_API
} from '../constants/routes';
import history from '../helpers/history';

// GET LIST BOOKING
export const getDataListBooking = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token,
          id,
          role
        }
      },
      serviceProvidersListData: {
        serviceProviderById: {
          id: idServiceProvider
        }
      },
      bookingData: {
        statutFilter
      }
    } = getState();

    if (role === TYPE_ADMIN) {
      const booking = await fetch(`${SERVICEPROVIDER_API}/${idServiceProvider}/booking`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const bookingResponse = await booking.json();

      let filter;
      if (statutFilter === null || statutFilter === undefined) {
        filter = ALL;
      } else {
        filter = statutFilter;
      }

      if (bookingResponse.length > 0) {
        if (role === TYPE_ADMIN) {
          return dispatch(setDataBookingList(bookingResponse, filter));
        }
      }
      return dispatch(setDataBookingList([], filter));
    }

    const booking = await fetch(`${SERVICEPROVIDER_API}/${id}/booking`, {
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

    const bookingResponse = await booking.json();
    if (bookingResponse.length > 0) {
      return dispatch(setDataBookingList(bookingResponse, filter));
    }
    return dispatch(setDataBookingList([], filter));
  };
};


// LIST BOOKING BY SORT
// @param item of sort
export const getDataBookingListByStatut = (item) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token,
          id,
          role
        }
      },
      serviceProvidersListData: {
        serviceProviderById: {
          id: idServiceProvider
        }
      }
    } = getState();

    let booking;

    if (role === TYPE_ADMIN) {
      booking = await fetch(`${SERVICEPROVIDER_API}/${idServiceProvider}/booking?sort=${item}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }

    if (role !== TYPE_ADMIN) {
      booking = await fetch(`${SERVICEPROVIDER_API}/${id}/booking?sort=${item}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }

    const bookingResponse = await booking.json();

    if (bookingResponse.length > 0) {
      return dispatch(setDataBookingList(bookingResponse, item));
    }
    return dispatch(setDataBookingList([], item));
  };
};

// UPDATE BOOKING
// @param id booking
export const updateBooking = (bookingId, state) => async (dispatch, getState) => {
  const {
    usersData: {
      users: {
        token
      }
    }
  } = getState();

  const response = await fetch(`${BOOKING_API}/${bookingId}`,
    {
      body: JSON.stringify({
        statut: state
      }),
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

  if (response.ok) {
    dispatch({
      type: UPDATE_BOOKING_SUCCESS
    });
    dispatch(getDataListBooking());
    history.push(BOOKING_PATH);
  } else {
    const error = await response.text();
    dispatch({
      type: UPDATE_BOOKING_ERROR,
      payload: error
    });
  }

  return null;
};

// GET ALL STATUT OF BOOKING
export const getDataBookingStatut = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token,
          id,
          role
        }
      },
      serviceProvidersListData: {
        serviceProviderById: {
          id: idServiceProvider
        }
      }
    } = getState();

    let statut;

    if (role === TYPE_ADMIN) {
      statut = await fetch(`${SERVICEPROVIDER_API}/${idServiceProvider}/booking`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      statut = await fetch(`${SERVICEPROVIDER_API}/${id}/booking`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }

    const statutResponse = await statut.json();
    const allStatutName = statutResponse.map((item) => item.statut);
    const bookingStatut = uniq(allStatutName);

    if (bookingStatut.length > 0) {
      return dispatch(setDataBookingStatut(bookingStatut));
    }
    return dispatch(setDataBookingStatut([]));
  };
};

// SET STATUTS OF BOOKING
// @param array of statut
export const setDataBookingStatut = (data) => {
  return {
    type: SET_DATA_BOOKING_STATUT,
    payload: data
  };
};

// SEARCH BOOKING
// @param value of input
export const getDataBookingListSearch = (value) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token,
          id,
          role
        }
      },
      serviceProvidersListData: {
        serviceProviderById: {
          id: idServiceProvider
        }
      },
      bookingData: {
        statutFilter
      }
    } = getState();

    let filter;

    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    let booking;

    if (role === TYPE_ADMIN) {
      if (value.lenght === 0) {
        booking = await fetch(`${SERVICEPROVIDER_API}/${idServiceProvider}/booking?sort=${filter}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        booking = await fetch(`${SERVICEPROVIDER_API}/${idServiceProvider}/booking?sort=${filter}&search=${value}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    if (role !== TYPE_ADMIN) {
      if (value.lenght === 0) {
        booking = await fetch(`${SERVICEPROVIDER_API}/${id}/booking?sort=${filter}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        booking = await fetch(`${SERVICEPROVIDER_API}/${id}/booking?sort=${filter}&search=${value}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    const bookingResponse = await booking.json();

    if (bookingResponse.length > 0) {
      return dispatch(setDataBookingList(bookingResponse, filter));
    }
    return dispatch(setDataBookingList([], filter));
  };
};


// SET BOOKING LIST
// @param data & statut
export const setDataBookingList = (data, item) => {
  return {
    type: SET_DATA_BOOKING_LIST,
    payload: {
      data,
      item
    }
  };
};
