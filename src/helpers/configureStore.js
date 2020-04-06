import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage
};

const enhancers = [];
const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default () => {
  const store = createStore(persistedReducer, composedEnhancers);
  return { store, persistor: persistStore(store) };
};

/*
export function configureStore(initialState) {
  const storeData = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      autoRehydrate()
    ),
  );

  return storeData;
}
*/
