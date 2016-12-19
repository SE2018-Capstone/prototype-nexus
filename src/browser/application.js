import { BrowserWindow } from 'electron';
import loadWindow from 'utils/loadWindow';

export default class Application {
  constructor() {
    const mainWindow = new BrowserWindow({
      width: 1024,
      height: 728,
    });

    const spotifyWindow = new BrowserWindow({
      width: 500,
      minWidth: 500,
      maxWidth: 500,
      height: 400,
      minHeight: 400,
      maxHeight: 400,
    });

    const photoWindow = new BrowserWindow({
      width: 440,
      minWidth: 440,
      maxWidth: 440,
      height: 450,
      minHeight: 450,
      maxHeight: 450,
    });

    loadWindow({
      wnd: mainWindow,
      params: { route: '/main' }
    });

    loadWindow({
      wnd: photoWindow,
      params: { route: '/photo-controller' }
    });
    
    loadWindow({
      wnd: spotifyWindow,
      params: { route: '/spotify-controller' }
    });

  }
}
