/* eslint-disable */
import React from 'react';
import { Route } from 'react-router-dom';


const configureRoutes = (routes) => {
  if (Array.isArray(routes)) {
    return routes.map((route, index) => {
      return (
        <Route exact path={route.path} component={route.component} key={`route-index-${index}`} />
      );
    });
  }
  return []
};

export default configureRoutes;
