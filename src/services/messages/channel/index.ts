import { ipcRenderer, ipcMain } from 'electron';

function getChannelRoot() {
  return ipcRenderer || ipcMain;
}

export function createAppChannel<Data>(name: string) {
  const channelFullName = `channel--${name}`;
  function send(data: Data) {
    const transport = getChannelRoot();
    ipcRenderer.send(channelFullName, data);
  }

  function subscribe(callback: (data: Data) => void) {
    const action = (event: any, data: Data) => {
      callback(data);
    };
    const transport = getChannelRoot();
    transport.on(channelFullName, action);

    return () => transport.removeListener(channelFullName, action);
  }

  return { send, subscribe };
}
