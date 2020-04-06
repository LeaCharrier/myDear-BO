import {
  SET_SERVICE_ID,
  SET_SERVICEPROVIDER_ID,
  SET_MODAL
} from '../constants/actions';

// SET SERVICE ID
// @param id of service
export const setServiceId = (id) => {
  return {
    type: SET_SERVICE_ID,
    payload: id
  };
};

// SET SERVICE PROVIDER ID
// @param id of serviceProvider
export const setServiceProviderId = (id) => {
  return {
    type: SET_SERVICEPROVIDER_ID,
    payload: id
  };
};

// SET MODAL
export const setModal = () => {
  return {
    type: SET_MODAL
  };
};
