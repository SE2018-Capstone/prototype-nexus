import { BrowserWindow } from 'electron';
import loadWindow from 'utils/loadWindow';
import * as os_calls from 'node-os-calls';
try {
  console.log(os_calls.getVolume());
} catch(err) {
  console.log(err);
}

export default class Application {
  constructor() {
    const mainWindow = new BrowserWindow({
      width: 1024,
      height: 728
    });

    loadWindow({
      wnd: mainWindow,
      params: { route: '/main' }
    });
  }
}
