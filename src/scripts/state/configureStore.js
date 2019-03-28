import { createStore, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import projectReducer from './reducers/projectReducer';
import settingsReducer from './reducers/settingsReducer';


const persistSettingsConfig = {
    key: 'settings',
    storage
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            project: projectReducer,
            settings: persistReducer(persistSettingsConfig, settingsReducer)
        }), composeEnhancers()
    );

    const persistor = persistStore(store);

    return { store, persistor };
};