import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state/configurestore';
import Application from './components/Application';
import BeadManager from './project/beadmanager';
import brands from './project/brands';
import { setSelectedBead, setSelectedBrand } from './state/actions/projectactions';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '../styles/index.scss';

const store = configureStore();
const appName = 'Futility';
const beadManager = new BeadManager();
const defaultBrand = brands.PERLER;

store.dispatch(setSelectedBrand(defaultBrand));
store.dispatch(setSelectedBead(beadManager.getBeads(defaultBrand)[0]));

const jsx = (
    <Provider store={store}>
        <Application appName={appName} beadManager={beadManager} />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
