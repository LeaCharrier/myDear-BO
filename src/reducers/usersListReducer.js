import {
  SET_DATA_USERS_LIST,
  DELETE_USER_SUCCESS,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  SET_DATA_USER_LIST_BY_ID,
  IS_EDIT_USER,
  ADD_USER_ERROR,
  DELETE_USER_ERROR,
  UPDATE_USER_ERROR
} from '../constants/actions';

const initialState = {
  users: [],
  usersById: {},
  isEdit: '',
  errorForm: '',
  statutFilter: 'all'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_EDIT_USER: {
      return {
        ...state,
        isEdit: action.payload
      };
    }
    case SET_DATA_USER_LIST_BY_ID: {
      const { payload } = action;

      return {
        ...state,
        usersById: payload
      };
    }
    case SET_DATA_USERS_LIST: {
      const { payload } = action;

      return {
        ...state,
        users: payload.data,
        errorForm: '',
        statutFilter: payload.filter
      };
    }
    case ADD_USER_SUCCESS: {
      const { payload } = action;
      const { users } = state;

      return {
        users: [...users, payload]
      };
    }
    case ADD_USER_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case DELETE_USER_SUCCESS: {
      const { payload } = action;
      const { users } = state;
      const newUsers = users.filter(p => p.id !== payload.id);

      return {
        users: newUsers
      };
    }
    case DELETE_USER_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        usersById: initialState.usersById
      };
    }
    case UPDATE_USER_ERROR: {
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
