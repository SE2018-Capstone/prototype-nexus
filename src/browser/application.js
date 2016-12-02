import url from 'url';
import BrowserWindow from 'browser-window';

export default class Application {
  constructor() {
    const mainWindow = new BrowserWindow({
      width: 1024,
      height: 728
    });

    this.loadRoute({
      wnd: mainWindow,
      params: { route: '/main' }
    });
  }

  // Routes are used to determine what root component a window should be
  // showing.  This allows for multiple windows to display different things
  loadRoute({wnd, pathname, params: params = {}}) {
    if (!pathname) {
      const htmlFile = process.env.HOT ? `index-hot.html` : `index.html`;
      pathname = `${process.cwd()}/static/${htmlFile}`;
    }

    const targetUrl = url.format({
      protocol: 'file',
      pathname: pathname,
      slashes: true,
      query: {windowParams: JSON.stringify(params)}
    });

    wnd.loadURL(targetUrl);
  }
}
