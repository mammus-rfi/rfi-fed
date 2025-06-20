import { app, BrowserWindow, ipcMain, session } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

};

ipcMain.on('open-discord-login', (event) => {
  const discordWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const redirectUri = 'http://localhost:3000/main_window/index.html#/Dashboard';

  discordWindow.loadURL('https://discord.com/oauth2/authorize?client_id=1343973578650943579&response_type=token&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=identify');

  discordWindow.webContents.on('did-navigate', (event, url) => {
    const params = new URLSearchParams(url)
    if (params.get('access_token')) {
      const code = `${params.get('token_type')} ${params.get('access_token')}`
      if (mainWindow) {
        mainWindow.webContents.send('discord-oauth-code', code)
      }
      discordWindow.close()
    }
  });
});

app.whenReady().then(() => {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' data:; connect-src 'self' https://discord.com; img-src 'self' data: https://cdn.discordapp.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
        ]
      }
    });
  });
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    mainWindow = null
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
