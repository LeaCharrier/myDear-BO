import {
  LISTUSERS_PATH,
  LISTSERVICEPRODIVER_PATH,
  DASHBOARD_PATH,
  LISTROOMS_PATH,
  TAGS_PATH,
  BOOKING_PATH
} from './routes';

export const HEADER_NAV = [
  {
    image: 'https://i.goopics.net/51dY1.png',
    title: 'Tableau de bord',
    url: DASHBOARD_PATH,
    role: 'administrator'
  },
  {
    image: 'https://i.goopics.net/LX9oO.png',
    title: 'Utilisateurs',
    url: LISTUSERS_PATH,
    role: 'administrator'
  },
  {
    image: 'https://i.goopics.net/75PgR.png',
    title: 'Prestataires',
    url: LISTSERVICEPRODIVER_PATH,
    role: 'administrator'
  },
  {
    image: 'https://i.goopics.net/Aeyn0.png',
    title: 'Salles',
    url: LISTROOMS_PATH,
    role: 'administrator'
  },
  {
    image: 'https://i.ibb.co/jvhbk7Q/tag.png',
    title: 'Tags',
    url: TAGS_PATH,
    role: 'administrator'
  },
  {
    image: 'https://i.goopics.net/Aeyn0.png',
    title: 'Mes salles',
    url: LISTROOMS_PATH,
    role: 'serviceProvider'
  },
  {
    image: 'https://i.ibb.co/QQWDKLR/devis.png',
    title: 'Mes devis',
    url: BOOKING_PATH,
    role: 'serviceProvider'
  }
];

export const t = 'tt';
