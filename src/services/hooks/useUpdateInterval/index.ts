import { useState, useEffect } from 'react';

export function useUpdateInterval(interval = 5000) {
  const [_, setState] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setState({});
      console.log('ebe');
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);
}
