import {
  SET_DATA_ROOMS_LIST,
  DELETE_ROOM_SUCCESS,
  UPDATE_ROOM_SUCCESS,
  DELETE_ROOM_ERROR,
  UPDATE_ROOM_ERROR,
  SET_DATA_ROOMS_LIST_BY_ID,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_ERROR,
  IS_EDIT_ROOM,
  UPDATE_DATA_CAROUSEL,
  SET_DATA_ROOMS_LIST_SERVICE_PROVIDER,
  UPDATE_IMAGES_TO_UPLOAD
} from '../constants/actions';

const initialState = {
  rooms: [],
  roomById: {},
  isEdit: '',
  carousel: [],
  errorForm: '',
  imagesToUpload: [],
  statutFilter: 'all'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_ROOMS_LIST_SERVICE_PROVIDER: {
      const { payload } = action;
      const rooms = payload.data.filter(p => p.serviceProviderId.id === payload.id);
      return {
        ...state,
        rooms,
        errorForm: '',
        carousel: [],
        imagesToUpload: [],
        statutFilter: payload.filter
      };
    }
    case UPDATE_DATA_CAROUSEL: {
      const { payload } = action;

      return {
        ...state,
        carousel: payload
      };
    }
    case UPDATE_IMAGES_TO_UPLOAD: {
      const { payload } = action;

      return {
        ...state,
        imagesToUpload: payload
      };
    }
    case IS_EDIT_ROOM: {
      return {
        ...state,
        isEdit: action.payload
      };
    }
    case SET_DATA_ROOMS_LIST: {
      const { payload } = action;

      return {
        ...state,
        rooms: payload.data,
        errorForm: '',
        carousel: [],
        imagesToUpload: [],
        statutFilter: payload.filter
      };
    }
    case DELETE_ROOM_SUCCESS: {
      const { payload } = action;
      const { rooms } = state;
      const newRooms = rooms.filter(p => p.id !== payload.id);

      return {
        ...state,
        rooms: newRooms,
        carousel: [],
        imagesToUpload: []
      };
    }
    case DELETE_ROOM_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case UPDATE_ROOM_SUCCESS: {
      return {
        ...state,
        roomById: initialState.roomById,
        carousel: [],
        imagesToUpload: []
      };
    }
    case UPDATE_ROOM_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case SET_DATA_ROOMS_LIST_BY_ID: {
      const { payload } = action;

      return {
        ...state,
        roomById: payload.data,
        carousel: payload.carousel
      };
    }
    case ADD_ROOM_SUCCESS: {
      const { payload } = action;
      const { rooms } = state;

      return {
        ...state,
        rooms: [...rooms, payload],
        carousel: [],
        imagesToUpload: []
      };
    }
    case ADD_ROOM_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    default: {
      return state;
    }
  }
};
