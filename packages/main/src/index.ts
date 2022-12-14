import {app, nativeImage, Tray, Menu} from 'electron';
import './security-restrictions';
import {restoreOrCreateWindow} from '/@/mainWindow';
import icon from '../../../buildResources/icon.png';

const ElectronStore = require('electron-store');
ElectronStore.initRenderer();

if (import.meta.env.PROD) {
  const AutoLaunch = require('auto-launch');
  new AutoLaunch({
    name: 'Sleep',
  }).enable();
}

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', restoreOrCreateWindow);

/**
 * Create app window when background process will be ready
 */
let tray;
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .then(() => {
    tray = new Tray(nativeImage.createFromDataURL(icon));
    tray.on('click', async () => {
      const window = await restoreOrCreateWindow();
      window.show();
    });
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Show',
          type: 'normal',
          role: 'unhide',
          click: async () => {
            const window = await restoreOrCreateWindow();
            window.show();
          },
        },
        {label: 'Quit', type: 'normal', role: 'quit'},
      ]),
    );
  })
  .catch(e => console.error('Failed create window:', e));

/**
 * Check for new version of the application - production mode only.
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
    .catch(e => console.error('Failed check updates:', e));
}
