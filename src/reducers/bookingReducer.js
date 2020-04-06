import {
  SET_DATA_BOOKING_LIST,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_ERROR,
  SET_DATA_BOOKING_STATUT
} from '../constants/actions';

const initialState = {
  booking: [],
  bookingStatut: [],
  statutFilter: 'all'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_BOOKING_LIST: {
      const { payload } = action;
      return {
        ...state,
        booking: payload.data,
        statutFilter: payload.item
      };
    }
    case UPDATE_BOOKING_SUCCESS: {
      return {
        ...state
      };
    }
    case UPDATE_BOOKING_ERROR: {
      return {
        ...state
      };
    }
    case SET_DATA_BOOKING_STATUT: {
      const { payload } = action;

      return {
        ...state,
        bookingStatut: payload
      };
    }
    default: {
      return state;
    }
  }
};
