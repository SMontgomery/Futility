import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {LocalizeProvider} from 'react-localize-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './state/configureStore';
import Application from './components/Application';
import BeadManager from './project/beadManager';
import brands from './project/brands';
import {setSelectedBead, setSelectedBrand} from './state/actions/uiActions';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import '../styles/index.scss';

const {store, persistor} = configureStore();
const appName = 'Futility';
const beadManager = new BeadManager();
const defaultBrand = brands.PERLER;

store.dispatch(setSelectedBrand(defaultBrand));
store.dispatch(setSelectedBead(beadManager.getBeads(defaultBrand)[0]));

const jsx = (
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Application appName={appName} beadManager={beadManager} />
      </PersistGate>
    </LocalizeProvider>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
