import { createAppChannel } from '~app/services/messages';
import { AppOptions } from '~app/shared/options';

export const appHeightChannel = createAppChannel<number>('app-height');
export const closeWindowChannel = createAppChannel<void>('close-window');
export const visibleClipboardItemsChannel = createAppChannel<string[]>(
  'visible-clipboard-items',
);
export const appOptionsChannel = createAppChannel<AppOptions>('app-options');
export const appQuitRequestChannel = createAppChannel<true>('app-quit-request');
