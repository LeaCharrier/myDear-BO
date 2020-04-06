/* eslint-disable */
import { getFormValues } from 'redux-form';
import history from '../helpers/history';
import {
  DELETE_SERVICE_PROVIDER_ERROR,
  DELETE_SERVICE_PROVIDER_SUCCESS,
  ADD_SERVICE_PROVIDER_SUCCESS,
  ADD_SERVICE_PROVIDER_ERROR,
  UPDATE_SERVICE_PROVIDER_SUCCESS,
  UPDATE_SERVICE_PROVIDER_ERROR,
  SET_DATA_SERVICEPROVIDER_LIST,
  IS_EDIT_SERVICE_PROVIDER,
  SET_DATA_SERVICE_PROVIDER_LIST_BY_ID,
  UPDATE_PROFIL_SUCCESS
} from '../constants/actions';
import {
  LISTSERVICEPRODIVER_PATH,
  DASHBOARD_PATH,
  SERVICEPROVIDER_API
} from '../constants/routes';
import {
  TYPE_ADMIN,
  ALL
} from '../constants/strings';

// IS EDIT SERVICEPROVIDER
// @param value is edit
export const isEditServiceProvider = (value) => {
  return {
    type: IS_EDIT_SERVICE_PROVIDER,
    payload: value
  };
};

// GET DATA SERVICEPROVIDER SEARCH
// @param value of input
export const getDataServiceProvidersListSearch = (value) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      },
      serviceProvidersListData: {
        statutFilter
      }
    } = getState();

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    const serviceProviders = await fetch(`${SERVICEPROVIDER_API}?search=${value}&sort=${filter}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const serviceProvidersResponse = await serviceProviders.json();

    if (serviceProvidersResponse.length > 0) {
      return dispatch(setDataServiceProviderList(serviceProvidersResponse, filter));
    }
    return dispatch(setDataServiceProviderList([], filter));
  };
};

// GET DATA SERVICEPROVIDER BY ORDER
// @param order
export const getDataServiceProviderListByOrderAlph = (order) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();

    let serviceProviders;

    serviceProviders = await fetch(`${SERVICEPROVIDER_API}?sort=${order}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const serviceProvidersResponse = await serviceProviders.json();

    if (serviceProvidersResponse.length > 0) {
      return dispatch(setDataServiceProviderList(serviceProvidersResponse, order));
    }
    return dispatch(setDataServiceProviderList([], order));
  };
};

// SET DATA SERVICEPROVIDER BY ID
// @param data
export const setDataServiceProviderListById = (data) => {
  return {
    type: SET_DATA_SERVICE_PROVIDER_LIST_BY_ID,
    payload: data
  };
};

// GET DATA SERVICEPROVIDER BY ID
// @param id of serviceProvider
export const getDataListServiceProviderById = (id) => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();

    const serviceProvider = await fetch(`${SERVICEPROVIDER_API}/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const serviceProviderResponse = await serviceProvider.json();

    if (serviceProviderResponse) {
      return dispatch(setDataServiceProviderListById(serviceProviderResponse));
    }
    return dispatch(setDataServiceProviderListById([]));
  };
};

// SET DATA SERVICEPROVIDER LIST
// @param data
export const setDataServiceProviderList = (data, filter) => {
  return {
    type: SET_DATA_SERVICEPROVIDER_LIST,
    payload: {
      data,
      filter
    }
  };
};

// GET DATA LIST SERVICEPROVIDERS
export const getDataListServiceProviders = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      },
      serviceProvidersListData: {
        statutFilter
      }
    } = getState();

    let filter;
    if (statutFilter === null || statutFilter === undefined) {
      filter = ALL;
    } else {
      filter = statutFilter;
    }

    const serviceProviders = await fetch(`${SERVICEPROVIDER_API}?sort=${filter}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const serviceProvidersResponse = await serviceProviders.json();

    if (serviceProvidersResponse.length > 0) {
      return dispatch(setDataServiceProviderList(serviceProvidersResponse, filter));
    }
    return dispatch(setDataServiceProviderList([], filter));
  };
};

// UPDATA SERVICEPROVIDER
// @param serviceProviderID & pictures
export const updateServiceProvider = (serviceProviderId, pictures) => async (dispatch, getState) => {
  const state = getState();
  const {
    usersData: {
      users: {
        token
      }
    }
  } = state;

  const serviceProvider = getFormValues('ServiceProviderValues')(state);
  if(serviceProvider.services) {
    serviceProvider.services = serviceProvider.services.map(({ id }) => id);
  }
  const formData = new FormData();

  let patchJson = {
    birthDate: serviceProvider.birthDate,
    firstname: serviceProvider.firstname,
    img: serviceProvider.img,
    lastname: serviceProvider.lastname,
    mail: serviceProvider.mail,
    phone: serviceProvider.phone,
    sexe: serviceProvider.sexe,
    username: serviceProvider.username
  };

  if ('password' in serviceProvider && serviceProvider.password !== '') {
    patchJson.password = serviceProvider.password;
  }

  formData.append('json', JSON.stringify(patchJson));

  if(pictures.length > 0) {
    Object.keys(pictures).forEach((elem) => {
      formData.append('img', pictures[elem]);
    });
  }

  const response = await fetch(`${SERVICEPROVIDER_API}/${serviceProviderId}`,
    { body: formData,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.ok) {
    dispatch({
      type: UPDATE_SERVICE_PROVIDER_SUCCESS,
      payload: {
        serviceProvider,
        serviceProviderId
      }
    });
    if (serviceProvider.role !== TYPE_ADMIN) {
      history.push(LISTSERVICEPRODIVER_PATH);
    } else {
      dispatch({
        type: UPDATE_PROFIL_SUCCESS,
        payload: {
          serviceProvider
        }
      });
      history.push(DASHBOARD_PATH);
    }
  } else {
    const error = await response.text();
    dispatch({
      type: UPDATE_SERVICE_PROVIDER_ERROR,
      payload: error
    });
  }
};

// DELETE SERVICEPROVIDER
// @param serviceProviderId
export const deleteServiceProvider = id => async (dispatch, getState) => {
  const {
    usersData: {
      users: {
        token
      }
    }
  } = getState();

  return fetch(`${SERVICEPROVIDER_API}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: DELETE_SERVICE_PROVIDER_SUCCESS,
        payload: {
          id
        }
      });
      history.push(LISTSERVICEPRODIVER_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: DELETE_SERVICE_PROVIDER_ERROR,
        payload: error
      });
    }
  });
};

// ADD SERVICEPROVIDER
// @param pictures
export const addServiceProvider = (pictures) => async (dispatch, getState) => {
  const state = getState();
  const {
    usersData: {
      users: {
        token
      }
    }
  } = state;

  const serviceProvider = getFormValues('ServiceProviderValues')(state);
  const formData = new FormData();

  formData.append('json', JSON.stringify(serviceProvider));

  if(pictures.length > 0) {
    Object.keys(pictures).forEach((elem) => {
      formData.append('img', pictures[elem]);
    });
  }

  return fetch(`${SERVICEPROVIDER_API}/`, {
    body: formData,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async response => {
    if (response.ok) {
      dispatch({
        type: ADD_SERVICE_PROVIDER_SUCCESS,
        payload: response.body
      });
      history.push(LISTSERVICEPRODIVER_PATH);
    } else {
      const error = await response.text();
      dispatch({
        type: ADD_SERVICE_PROVIDER_ERROR,
        payload: error
      });
    }
  });
};
