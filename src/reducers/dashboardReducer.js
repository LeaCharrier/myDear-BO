import {
  SET_DATA_DASHBOARD
} from '../constants/actions';

const initialState = {
  dashboard: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_DASHBOARD: {
      const { payload } = action;
      return {
        dashboard: payload
      };
    }
    default: {
      return state;
    }
  }
};
