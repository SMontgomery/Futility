import { createStore, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import uiReducer from './reducers/uiReducer';
import settingsReducer from './reducers/settingsReducer';
import projectReducer from './reducers/projectReducer';


const persistSettingsConfig = {
    key: 'settings',
    storage
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

export default () => {
    const store = createStore(
        combineReducers({
            ui: uiReducer,
            project: projectReducer,
            settings: persistReducer(persistSettingsConfig, settingsReducer)
        }), composeEnhancers()
    );

    const persistor = persistStore(store);

    return { store, persistor };
};