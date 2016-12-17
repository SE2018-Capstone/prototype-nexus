
'use strict';
import { app, BrowserWindow } from 'electron';
import Application from 'browser/application';

require('electron-debug')();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', function() {
  const application = new Application();
});
