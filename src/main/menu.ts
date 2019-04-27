import menubar from 'menubar';
import * as path from 'path';

const dir = path.resolve(__dirname, '../..');

const index = `file://${dir}/menu.html`;

const icon = path.resolve(dir, 'IconTemplate.png');

export function initMenu() {
  const appMenu = menubar({
    dir,
    index,
    icon,
    movable: false,
    frame: false,
    width: 400,
    height: 380,
    preloadWindow: true,
  });
}
