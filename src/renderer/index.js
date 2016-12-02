import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'components/app';
import Main from 'components/main';
import Secondary from 'components/secondary';
import url from 'url';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import WindowSettings from 'window-settings';

const reactHost = global.document.createElement('span');
global.document.body.appendChild(reactHost);

let history = createMemoryHistory();
render((
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/main" component={Main}/>
        <Route path="/secondary" component={Secondary}/>
      </Route>
    </Router>
), reactHost);

if (WindowSettings.route) {
  history.pushState(null, WindowSettings.route);
}
