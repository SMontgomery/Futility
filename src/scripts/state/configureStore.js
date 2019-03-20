import { createStore, combineReducers, compose } from 'redux';
import projectReducer from './reducers/projectReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            project: projectReducer
        }), composeEnhancers()
    );

    return store;
};