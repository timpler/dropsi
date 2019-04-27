import Store from 'electron-store';
import { useMemo, useState } from 'react';

const storeKey = 'data';

export function usePersistedState<T>(
  key: string,
  initial: T,
): [T, (value: T) => void] {
  const store = new Store({ name: key });

  const currentData = store.get(storeKey, initial);

  const [state, setLocalState] = useState<T>(currentData);

  console.log({ state });

  function setStateAndPersist(data: T) {
    store.set(storeKey, data);
    setLocalState(data);
  }

  return [state, setStateAndPersist];
}

export function usePersistedList<I>(key: string) {
  const [items, setItems] = usePersistedState<I[]>(key, []);

  console.log('ebebe', items);

  function addItem(item: I) {
    console.log('adding', { items, item });
    setItems([item, ...items]);
  }

  function removeItemByIndex(index: number) {
    // TODO: optimize
    setItems(items.filter((item, itemIndex) => itemIndex !== index));
  }

  function removeWhere(decider: (item: I) => boolean) {
    setItems(items.filter((item) => !decider(item)));
  }

  function updateItem(
    where: (item: I) => boolean,
    updater: (item: I) => I,
  ): boolean {
    let didUpdateAnything = false;

    const newItems = items.map((item) => {
      const needsUpdate = where(item);

      if (!needsUpdate) {
        return item;
      }

      const updated = updater(item);

      didUpdateAnything = true;
      return updated;
    });

    if (didUpdateAnything) {
      setItems(newItems);
    }

    return didUpdateAnything;
  }

  function clear() {
    setItems([]);
  }

  return {
    items,
    addItem,
    removeItemByIndex,
    clear,
    setItems,
    updateItem,
    removeWhere,
  };
}
