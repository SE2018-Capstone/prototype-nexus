import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { electronEnhancer } from 'redux-electron-store';
import React from 'react';
import rootReducer from '../reducers';
import WindowSettings from 'window-settings';

let logger = createLogger({
  level: 'info',
  duration: true
});

let enhancer = compose(
  applyMiddleware(thunk, logger),
  electronEnhancer({
    dispatchProxy: a => store.dispatch(a),
    sourceName: WindowSettings.route ? WindowSettings.route.substring(1) : undefined,
  })
);

if (process.type === 'renderer' && !process.guestInstanceId) {
  enhancer = compose(
    enhancer,
    require('components/dev-tools').default.instrument()
  );
}

let store = enhancer(createStore)(rootReducer);


// Hot reloading of reducers
if (process.type !== 'renderer') {
  let { ipcMain } = require('electron');
  ipcMain.on('renderer-reload', (event, action) => {
    delete require.cache[require.resolve('../reducers')];
    store.replaceReducer(require('../reducers').default);
    event.returnValue = true;
  });
} else if (process.type === 'renderer' && !process.guestInstanceId) {
  let { ipcRenderer } = require('electron');
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      ipcRenderer.sendSync('renderer-reload');
      store.replaceReducer(require('../reducers').default);
    });
  }
}

export default store;
