import { createStore, combineReducers, compose } from 'redux';
import projectReducer from './reducers/projectReducer';
import settingsReducer from './reducers/settingsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            project: projectReducer,
            settings: settingsReducer
        }), composeEnhancers()
    );

    return store;
};