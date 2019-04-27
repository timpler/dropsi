import { BrowserWindow, screen } from 'electron';
import * as path from 'path';
import 'module-alias/register';

let mainWindow: Electron.BrowserWindow;

export function getWindow() {
  return mainWindow;
}

export function createWindow(rootFile: string) {
  mainWindow = new BrowserWindow({
    height: 40,
    width: 500,
    frame: false,
    transparent: true,
    hasShadow: false,
    maximizable: false,
    alwaysOnTop: true,
    icon: path.resolve('../..', 'store/64x64.png'),
    // darkTheme: true,
    // vibrancy: 'ultra-dark',
    resizable: false,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      affinity: 'window',
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(rootFile);

  moveWindowToCurrentScreen();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

export function moveWindowToCurrentScreen() {
  // Get mouse cursor absolute position
  const { x, y } = screen.getCursorScreenPoint();
  // Find the display where the mouse cursor will be
  const currentDisplay = screen.getDisplayNearestPoint({ x, y });
  // Set window position to that display coordinates
  mainWindow.setPosition(currentDisplay.workArea.x, currentDisplay.workArea.y);
  // Center window relatively to that display
  mainWindow.center();
  // Display the window
  mainWindow.show();
}
