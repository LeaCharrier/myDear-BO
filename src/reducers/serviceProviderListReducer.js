import {
  SET_DATA_SERVICEPROVIDER_LIST,
  DELETE_SERVICE_PROVIDER_SUCCESS,
  DELETE_SERVICE_PROVIDER_ERROR,
  ADD_SERVICE_PROVIDER_SUCCESS,
  ADD_SERVICE_PROVIDER_ERROR,
  UPDATE_SERVICE_PROVIDER_SUCCESS,
  UPDATE_SERVICE_PROVIDER_ERROR,
  IS_EDIT_SERVICE_PROVIDER,
  SET_DATA_SERVICE_PROVIDER_LIST_BY_ID
} from '../constants/actions';

const initialState = {
  serviceProviders: [],
  serviceProviderById: {},
  isEdit: '',
  errorForm: '',
  statutFilter: 'all'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_EDIT_SERVICE_PROVIDER: {
      const { payload } = action;

      return {
        ...state,
        isEdit: payload
      };
    }
    case SET_DATA_SERVICE_PROVIDER_LIST_BY_ID: {
      const { payload } = action;

      return {
        ...state,
        serviceProviderById: payload
      };
    }
    case ADD_SERVICE_PROVIDER_SUCCESS: {
      const { payload } = action;
      const { serviceProviders } = state;

      return {
        ...state,
        serviceProviders: [...serviceProviders, payload]
      };
    }
    case ADD_SERVICE_PROVIDER_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case DELETE_SERVICE_PROVIDER_SUCCESS: {
      const { payload } = action;
      const { serviceProviders } = state;
      const newServiceProviders = serviceProviders.filter(p => p.id !== payload.id);

      return {
        ...state,
        serviceProviders: newServiceProviders
      };
    }
    case DELETE_SERVICE_PROVIDER_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case UPDATE_SERVICE_PROVIDER_SUCCESS: {
      return {
        ...state,
        serviceProviderById: initialState.serviceProviderById
      };
    }
    case UPDATE_SERVICE_PROVIDER_ERROR: {
      const { payload } = action;

      return {
        ...state,
        errorForm: payload
      };
    }
    case SET_DATA_SERVICEPROVIDER_LIST: {
      const { payload } = action;

      return {
        ...state,
        serviceProviders: payload.data,
        errorForm: '',
        statutFilter: payload.filter
      };
    }
    default: {
      return state;
    }
  }
};
