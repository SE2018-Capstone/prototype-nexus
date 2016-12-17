import { BrowserWindow } from 'electron';
import loadWindow from 'utils/loadWindow';

export default class Application {
  constructor() {
    const mainWindow = new BrowserWindow({
      width: 1024,
      height: 728,
      frame: false
    });

    loadWindow({
      wnd: mainWindow,
      params: { route: '/main' }
    });

    mainWindow.webContents.openDevTools();
  }
}
