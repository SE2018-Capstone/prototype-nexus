import { BrowserWindow } from 'electron';
import loadWindow from 'utils/loadWindow';
import * as a from 'node-os-calls';
console.log(a.WhoAmI());

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
