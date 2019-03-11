import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';

import '../styles/index.scss';

const appName = 'Futility';
const jsx = (
    <Application appName={appName} />
);

ReactDOM.render(jsx, document.getElementById('app'));
