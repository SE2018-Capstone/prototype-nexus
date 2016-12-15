import BrowserWindow from 'browser-window';
import loadWindow from 'utils/loadWindow';

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
