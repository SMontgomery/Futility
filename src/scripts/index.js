import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {LocalizeProvider} from 'react-localize-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './state/configureStore';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import '../styles/index.scss';
import AppRouter from './router/AppRouter';
import AppLocalize from './localization/AppLocalize';

const {store, persistor} = configureStore();

const jsx = (
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppLocalize>
          <AppRouter/>
        </AppLocalize>
      </PersistGate>
    </LocalizeProvider>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
