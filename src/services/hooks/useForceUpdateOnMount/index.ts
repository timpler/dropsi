import { useState, useEffect } from 'react';

export function useForceUpdateOnMount() {
  const [_, setState] = useState({});

  useEffect(() => {
    setState({});
  }, []);
}
