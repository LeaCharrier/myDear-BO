/* eslint-disable no-use-before-define */
import {
  SET_DATA_DASHBOARD
} from '../constants/actions';
import {
  DASHBOARD_API
} from '../constants/routes';

// GET DATA DASHBOARD
export const getDataDashboard = () => {
  return async (dispatch, getState) => {
    const {
      usersData: {
        users: {
          token
        }
      }
    } = getState();
    const dashboardData = await fetch(`${DASHBOARD_API}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const dashboardResponse = await dashboardData.json();
    dispatch(setDashboardData(dashboardResponse));
  };
};

// SET DATA DASHBOARD
export const setDashboardData = (data) => {
  return {
    type: SET_DATA_DASHBOARD,
    payload: data
  };
};
