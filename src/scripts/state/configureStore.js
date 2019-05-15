import {createStore, combineReducers, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionReducer from './reducers/sessionReducer';
import settingsReducer from './reducers/settingsReducer';
import projectReducer from './reducers/projectReducer';
import {localizeReducer} from 'react-localize-redux';


const persistSettingsConfig = {
  key: 'settings',
  storage,
};

const persistProjectConfig = {
  key: 'project',
  storage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25}) || compose;

export default () => {
  const store = createStore(
      combineReducers({
        session: sessionReducer,
        project: persistReducer(persistProjectConfig, projectReducer),
        settings: persistReducer(persistSettingsConfig, settingsReducer),
        localize: localizeReducer,
      }), composeEnhancers()
  );

  const persistor = persistStore(store);

  return {store, persistor};
};
