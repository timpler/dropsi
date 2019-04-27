import { useState, useEffect, useRef } from 'react';
import Mousetrap from 'mousetrap';

interface Options {
  max: number;
}

export function useSelectableIndex(
  options: Options,
): [number, (index: number) => void] {
  const [index, setIndex] = useState(0);

  const indexRef = useRef(index);

  indexRef.current = index;
  const getIndex = () => indexRef.current;

  useEffect(() => {
    if (getIndex() > options.max) {
      setIndex(options.max);
    }

    const handler = new Mousetrap(document.body);

    function goUp() {
      if (getIndex() <= 0) {
        return;
      }
      setIndex(getIndex() - 1);
    }

    function goDown() {
      if (getIndex() >= options.max) {
        return;
      }
      setIndex(getIndex() + 1);
    }

    handler.bind(['up', 'ctrl+p'], goUp);
    handler.bind(['down', 'ctrl+n'], goDown);

    return () => {
      handler.reset();
    };
  }, [options.max]);

  return [index, setIndex];
}
