import Store from 'electron-store';

const store = new Store();

export function createStorage<T>(key: string, initial: T) {
  function get() {
    const value = store.get(key) as T;

    console.log(value);

    if (value === undefined) {
      return initial;
    }

    return value;
  }

  function set(data: T) {
    store.set(key, data);
  }

  return { get, set };
}
