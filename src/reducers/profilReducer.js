import {
  SET_DATA_USERS,
  SET_LOGOUT_USER,
  IS_EDIT_PROFIL,
  UPDATE_PROFIL_SUCCESS,
  LOGIN_ERROR
} from '../constants/actions';

const initialState = {
  users: [],
  isEdit: '',
  errorForm: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_EDIT_PROFIL: {
      return {
        ...state,
        isEdit: action.payload
      };
    }
    case UPDATE_PROFIL_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        users: payload.serviceProvider
      };
    }
    case SET_LOGOUT_USER: {
      return {
        ...state,
        users: initialState.user,
        errorForm: ''
      };
    }
    case SET_DATA_USERS: {
      const { payload } = action;

      return {
        ...state,
        users: payload,
        errorForm: ''
      };
    }
    case LOGIN_ERROR: {
      const { payload } = action;

      return {
        errorForm: payload
      };
    }
    default: {
      return state;
    }
  }
};
