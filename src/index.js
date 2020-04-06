import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './helpers/configureStore';
import history from './helpers/history';
import configureRoutes from './helpers/configureRoutes';
import routes from './routes/index';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import NotFound from './components/PagesWithLayout/NotFoundWithLayout/index';

const { persistor, store } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <div className="app">
            <Switch>
              {configureRoutes(routes)}
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
