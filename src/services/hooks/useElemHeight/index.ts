import { useState, useEffect, useRef } from 'react';

export function useTimer(callback: Function, timeout: number) {
  const intervalRef = useRef<number>(null);

  useEffect(() => {
    const id = setInterval(callback, timeout);
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [callback, timeout]);
}

export function useElemHeight(elem: HTMLElement, checkInterval = 200) {
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!elem) {
        return;
      }

      const newHeight = Math.floor(elem.clientHeight);

      if (newHeight !== height) {
        setHeight(newHeight);
      }

      return () => {
        clearInterval(intervalRef.current);
      };
    }, checkInterval);
  }, [elem, checkInterval]);

  return height;
}
