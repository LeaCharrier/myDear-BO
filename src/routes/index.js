import {
  APP_PATH,
  DASHBOARD_PATH,
  FORGETPASSWORD_PATH,
  LISTUSERS_PATH,
  LISTSERVICEPRODIVER_PATH,
  LISTROOMS_PATH,
  ROOM_UPDATE_PATH,
  ADD_SERVICEPROVIDER_PATH,
  SERVICE_PROVIDER_UPDATE_PATH,
  USER_ADD_PATH,
  USER_UPDATE_PATH,
  ROOM_ADD_PATH,
  TAGS_PATH,
  TAG_ADD_PATH,
  TAG_UPDATE_PATH,
  PROFIL_EDIT,
  BOOKING_PATH,
  BOOKING_SERVICE_PROVIDER_PATH
} from '../constants/routes';

import requireAuth from '../helpers/requireAuth';

import SignInPage from '../components/Pages/SignInPage/index';
import Dashboard from '../components/PagesWithLayout/DashboardPagesWithLayout/index';
import ForgetPassword from '../components/Pages/ForgetPassword/index';
import ListUsersPageWithLayout from '../components/PagesWithLayout/ListUsersPagesWithLayout/index';
import ListServiceProviderPageWithLayout from '../components/PagesWithLayout/ListServiceProviderPagesWithLayout/index';
import ListRoomsPageWithLayout from '../components/PagesWithLayout/ListRoomsPagesWithLayout/index';
import FormRoomPageWithLayout from '../components/PagesWithLayout/FormRoomPageWithLayout/index';
import FormServiceProviderPageWithLayout from '../components/PagesWithLayout/FormServiceProviderPageWithLayout';
import FormUserPageWithLayout from '../components/PagesWithLayout/FormUserPageWithLayout/index';
import FormTagsPageWithLayout from '../components/PagesWithLayout/FormTagsPageWithLayout/index';
import ListTagsPageWithLayout from '../components/PagesWithLayout/ListTagsPageWithLayout/index';
import FormProfilPageWithLayout from '../components/PagesWithLayout/FormProfilPageWithLayout/index';
import ListBookingWithLayout from '../components/PagesWithLayout/BookingPagesWithLayout/index';

const routes = [
  {
    component: SignInPage,
    path: APP_PATH,
    default: true
  },
  {
    component: requireAuth(Dashboard),
    path: DASHBOARD_PATH
  },
  {
    component: ForgetPassword,
    path: FORGETPASSWORD_PATH
  },
  {
    component: requireAuth(ListUsersPageWithLayout),
    path: LISTUSERS_PATH
  },
  {
    component: requireAuth(ListServiceProviderPageWithLayout),
    path: LISTSERVICEPRODIVER_PATH
  },
  {
    component: requireAuth(ListRoomsPageWithLayout),
    path: LISTROOMS_PATH
  },
  {
    component: requireAuth(FormRoomPageWithLayout),
    path: `${ROOM_UPDATE_PATH}/:id`
  },
  {
    component: requireAuth(FormServiceProviderPageWithLayout),
    path: ADD_SERVICEPROVIDER_PATH
  },
  {
    component: requireAuth(FormServiceProviderPageWithLayout),
    path: `${SERVICE_PROVIDER_UPDATE_PATH}/:id`
  },
  {
    component: requireAuth(FormUserPageWithLayout),
    path: USER_ADD_PATH
  },
  {
    component: requireAuth(FormUserPageWithLayout),
    path: `${USER_UPDATE_PATH}/:id`
  },
  {
    component: requireAuth(FormRoomPageWithLayout),
    path: ROOM_ADD_PATH
  },
  {
    component: requireAuth(ListTagsPageWithLayout),
    path: TAGS_PATH
  },
  {
    component: requireAuth(FormTagsPageWithLayout),
    path: TAG_ADD_PATH
  },
  {
    component: requireAuth(FormTagsPageWithLayout),
    path: `${TAG_UPDATE_PATH}/:id`
  },
  {
    component: requireAuth(FormProfilPageWithLayout),
    path: `${PROFIL_EDIT}/:id`
  },
  {
    component: requireAuth(ListBookingWithLayout),
    path: BOOKING_PATH
  },
  {
    component: requireAuth(ListBookingWithLayout),
    path: BOOKING_SERVICE_PROVIDER_PATH
  }
];

export default routes;
