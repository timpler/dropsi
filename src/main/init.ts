import { app } from 'electron';
import { createWindow, getWindow } from './window';

import { bootstrap } from './bootstrap';

export function initializeApp(rootFile: string) {
  app.on('ready', () => {
    createWindow(rootFile);

    bootstrap();

    app.dock.hide();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (getWindow() === null) {
      createWindow(rootFile);
    }
  });
}
