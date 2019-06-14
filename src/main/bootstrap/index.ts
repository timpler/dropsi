import {
  appHeightChannel,
  closeWindowChannel,
  appOptionsChannel,
  appQuitRequestChannel,
} from '~app/channels';
import { getWindow, moveWindowToCurrentScreen } from '~app/main/window';
import { globalShortcut, app, Menu, MenuItem } from 'electron';

import { handleTouchbarUpdates } from './touchbar';
import { optionsStorage } from '~app/shared/options';

function autoresize() {
  return appHeightChannel.subscribe((height) => {
    getWindow().setSize(500, height);
  });
}

function close() {
  getWindow().hide();
  app.hide();
}

function handleCloseRequests() {
  getWindow().on('blur', () => {
    close();
  });

  return closeWindowChannel.subscribe(() => {
    close();
  });
}

function initializeMenu() {}

function handleOpenShortcut() {
  function handleOpen() {
    getWindow().show();
    moveWindowToCurrentScreen();
  }

  let currentShortcut = optionsStorage.get().shortcut;

  globalShortcut.register(currentShortcut, handleOpen);

  appOptionsChannel.subscribe(({ shortcut }) => {
    globalShortcut.unregister(currentShortcut);

    currentShortcut = shortcut;

    globalShortcut.register(currentShortcut, handleOpen);
  });
}

function handleQuitRequest() {
  appQuitRequestChannel.subscribe((confirmed) => {
    if (!confirmed) {
      return;
    }

    app.quit();
  });
}

export function bootstrap() {
  autoresize();
  handleCloseRequests();
  handleOpenShortcut();
  initializeMenu();
  handleTouchbarUpdates(close);
  handleQuitRequest();
}
