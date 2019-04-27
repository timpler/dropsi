import React, { useRef, useEffect } from 'react';
import { useForceUpdateOnMount } from '~app/services/hooks';
import { appHeightChannel } from '~app/channels';

import { ClipboardManager } from './ui';
import { bootstrap } from './bootstrap';
import styled from 'styled-components';
import { RootStyles } from '~app/ui/root';

const Holder = styled.div`
  max-height: 900px;
  background-color: #222;
  border-radius: 10px;
  font-weight: bold;
  overflow: hidden;
`;

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useForceUpdateOnMount();

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    let oldHeight: number = null;

    const timer = setInterval(() => {
      if (!rootRef.current) {
        return;
      }
      const newHeight = rootRef.current.clientHeight;
      if (oldHeight !== newHeight) {
        oldHeight = newHeight;
        appHeightChannel.send(newHeight);
      }
    }, 20);

    return () => clearInterval(timer);
  });

  return (
    <Holder ref={rootRef}>
      <RootStyles />
      <ClipboardManager />
    </Holder>
  );
}
