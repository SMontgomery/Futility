import React from 'react';
import {createBrowserHistory} from 'history';
import {Route, Router, Switch} from 'react-router-dom';
import Application from '../components/Application';
import NotFoundPage from '../components/pages/NotFoundPage';
import InitialPage from '../components/pages/InitialPage';
import ProjectRoute from './ProjectRoute';
import NonProjectRoute from './NonProjectRoute';

export const history = createBrowserHistory();

function AppRouter() {
  return (
    <Router history={history}>
      <Switch>
        <NonProjectRoute path='/' component={InitialPage} exact={true} />
        <ProjectRoute path='/project' component={Application}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default AppRouter;
