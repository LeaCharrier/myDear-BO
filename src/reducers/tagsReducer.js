import {
  SET_DATA_TAGS_LIST,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_ERROR,
  IS_EDIT_TAG,
  SET_DATA_TAG_LIST_BY_ID,
  ADD_TAG_SUCCESS,
  ADD_TAG_ERROR,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_ERROR,
  SET_DATA_ROOM_LIST,
  SET_DATA_EQUIPMENTS_LIST,
  SET_DATA_TAGS_CAT
} from '../constants/actions';

const initialState = {
  tags: [],
  equipments: [],
  tagsRoom: [],
  tagById: {},
  isEdit: '',
  errorForm: '',
  tagsCat: [],
  statutFilter: 'all'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_EDIT_TAG: {
      return {
        ...state,
        isEdit: action.payload
      };
    }
    case SET_DATA_TAG_LIST_BY_ID: {
      const { payload } = action;

      return {
        ...state,
        tagById: payload
      };
    }
    case ADD_TAG_SUCCESS: {
      const { payload } = action;
      const { tags } = state;

      return {
        ...state,
        tags: [...tags, payload]
      };
    }
    case ADD_TAG_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case DELETE_TAG_SUCCESS: {
      const { payload } = action;
      const { tags } = state;
      const newTags = tags.filter(p => p.id !== payload.id);

      return {
        ...state,
        tags: newTags
      };
    }
    case DELETE_TAG_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case UPDATE_TAG_SUCCESS: {
      return {
        ...state,
        tagById: initialState.tagById
      };
    }
    case UPDATE_TAG_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case SET_DATA_TAGS_LIST: {
      const { payload } = action;

      return {
        ...state,
        tags: payload.data,
        errorForm: '',
        statutFilter: payload.filter
      };
    }

    case SET_DATA_TAGS_CAT: {
      const { payload } = action;

      return {
        ...state,
        tagsCat: payload
      };
    }
    case SET_DATA_EQUIPMENTS_LIST: {
      const { payload } = action;

      return {
        ...state,
        equipments: payload,
        errorForm: ''
      };
    }
    case SET_DATA_ROOM_LIST: {
      const { payload } = action;

      return {
        ...state,
        tagsRoom: payload,
        errorForm: ''
      };
    }
    default: {
      return state;
    }
  }
};
