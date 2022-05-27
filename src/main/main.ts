/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { spawn } from 'child_process';
import kill from 'tree-kill';
import fs from 'fs';
import { GameSettingsObject } from 'renderer/types/game-settings';
import {
  getServerBatPath,
  getServerSettingsDir,
  resolveHtmlPath,
} from './util';
import store from './store';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
  mainWindow.removeMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.on('set-server-bat-path', async (event) => {
  const value = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'bat', extensions: ['bat'] }],
  });
  if (!value.canceled) store.set('serverBatPath', value.filePaths[0]);
  event.reply('set-server-bat-path-success', value.filePaths[0]);
});

ipcMain.on('set-server-settings-dir', async (event) => {
  const value = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (!value.canceled) store.set('serverSettingsDir', value.filePaths[0]);
  event.reply('set-server-settings-dir-success', value.filePaths[0]);
});

ipcMain.on('start-server', (event) => {
  const batPath = getServerBatPath();
  if (batPath) {
    const bat = spawn('cmd.exe', ['/c', batPath]);

    store.set('pid', bat.pid);

    bat.stdout.on('data', (data) => {
      console.log('data is : ', data.toString());

      event.reply('server-status-changed', 'online');
    });

    bat.stderr.on('data', (data) => {
      console.error('error is : ', data.toString());

      event.reply('server-status-changed', 'offline');
    });

    bat.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);

      event.reply('server-status-changed', 'offline');
    });
  }
});

ipcMain.on('stop-server', () => {
  const pid = store.get('pid');
  if (typeof pid === 'number') {
    kill(pid);
  }
});

ipcMain.on('set-initial-config-finish', (event) => {
  store.set('initialConfigFinish', true);
  event.reply('initial-config-finish', true);
});

ipcMain.handle('load-game-settings-data', async () => {
  const jsonPath = `${getServerSettingsDir()}\\ServerGameSettings.json`;
  delete require.cache[jsonPath];
  // eslint-disable-next-line import/no-dynamic-require
  const file = require(jsonPath);
  return file;
});

ipcMain.on('save-game-settings-config', (event, data) => {
  const jsonPath = `${getServerSettingsDir()}\\ServerGameSettings.json`;
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(data as Partial<GameSettingsObject>, null, 2)
  );
  event.reply('save-game-settings-config-success');
});
