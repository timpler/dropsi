import { createStorage } from '~app/services/storage';

export interface AppOptions {
  shortcut: string;
}

export const optionsStorage = createStorage<AppOptions>('app-options', {
  shortcut: 'command+shift+,',
});
