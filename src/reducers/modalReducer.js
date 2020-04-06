import {
  SET_SERVICE_ID,
  SET_SERVICEPROVIDER_ID,
  SET_MODAL
} from '../constants/actions';

const initialState = {
  idService: '',
  idServiceProvider: '',
  isModalOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICE_ID: {
      return {
        ...state,
        idService: action.payload
      };
    }
    case SET_SERVICEPROVIDER_ID: {
      return {
        ...state,
        idServiceProvider: action.payload
      };
    }
    case SET_MODAL: {
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    }
    default: {
      return state;
    }
  }
};
