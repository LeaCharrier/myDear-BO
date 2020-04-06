import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import profilReducer from './profilReducer';
import usersListReducer from './usersListReducer';
import serviceProviderListReducer from './serviceProviderListReducer';
import modalReducer from './modalReducer';
import roomsListReducer from './roomsListReducer';
import tagsReducer from './tagsReducer';
import dashboardReducer from './dashboardReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
  usersData: profilReducer,
  usersListData: usersListReducer,
  serviceProvidersListData: serviceProviderListReducer,
  roomsListData: roomsListReducer,
  modal: modalReducer,
  form: formReducer,
  tagsData: tagsReducer,
  dashboardData: dashboardReducer,
  bookingData: bookingReducer
});
