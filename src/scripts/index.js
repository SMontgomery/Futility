import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './state/configureStore';
import Application from './components/Application';
import BeadManager from './project/beadManager';
import brands from './project/brands';
import { setSelectedBead, setSelectedBrand } from './state/actions/projectActions';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '../styles/index.scss';

const { store, persistor } = configureStore();
const appName = 'Futility';
const beadManager = new BeadManager();
const defaultBrand = brands.PERLER;

store.dispatch(setSelectedBrand(defaultBrand));
store.dispatch(setSelectedBead(beadManager.getBeads(defaultBrand)[0]));

const jsx = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Application appName={appName} beadManager={beadManager} />
        </PersistGate>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
