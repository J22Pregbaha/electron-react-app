const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow(isDev) {
  console.log('Creating window, isDev:', isDev);
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '..', 'build', 'favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: !isDev,
    },
  });

  if (isDev) {
    const devURL = process.env.DEV_URL || 'http://localhost:3000';
    console.log('Loading development URL:', devURL);
    win.loadURL(devURL).catch((error) => {
      console.error('Failed to load development URL:', error);
    });
    win.webContents.openDevTools();
  } else {
    const prodPath = path.join(__dirname, '..', 'build', 'index.html');
    console.log('Loading production file:', prodPath);
    win.loadFile(prodPath).catch((error) => {
      console.error('Failed to load production file:', error);
    });
  }

  win.webContents.on('did-finish-load', () => {
    console.log('Page finished loading');
  });

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Failed to load: ${errorCode}, ${errorDescription}`);

    if (!isDev) {
      const errorPath = path.join(__dirname, '..', 'build', 'error.html');
      console.log('Loading error page:', errorPath);
      win.loadFile(errorPath).catch((error) => {
        console.error('Failed to load error page:', error);
      });
    }
  });
}

app.whenReady().then(() => {
  console.log('App is ready');
  const isDev = !app.isPackaged;
  console.log('Is development mode:', isDev);
  createWindow(isDev);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const isDev = !app.isPackaged;
    createWindow(isDev);
  }
});
