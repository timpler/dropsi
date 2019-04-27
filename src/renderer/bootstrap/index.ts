import Mousetrap from 'mousetrap';
import { closeWindowChannel } from '~app/channels';

const keyboard = new Mousetrap(document.body);

function initializeShortcuts() {
  keyboard.bind('esc', () => {
    closeWindowChannel.send();
  });
}

export function bootstrap() {
  initializeShortcuts();
}
