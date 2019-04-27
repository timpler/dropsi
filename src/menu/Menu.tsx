import React, { useRef, useEffect, useState } from 'react';
import { useForceUpdateOnMount } from '~app/services/hooks';
import {
  appHeightChannel,
  appOptionsChannel,
  appQuitRequestChannel,
} from '~app/channels';

import styled from 'styled-components';
import { RootStyles } from '~app/ui/root';
import { MenuItem, ShortcutRecorder, Help } from './ui';
import { AppOptions, optionsStorage } from '~app/shared/options';

const Holder = styled.div`
  max-height: 900px;
  background-color: #222;
  height: 100vh;
  font-weight: bold;
  overflow: hidden;
`;

const HelpHolder = styled.div`
  padding: 20px;
`;

export function Menu() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<AppOptions>(optionsStorage.get());

  function updateOptions(optionsToUpdate: Partial<AppOptions>) {
    setOptions({ ...options, ...optionsToUpdate });
  }

  function handleClose() {
    appQuitRequestChannel.send(true);
  }

  useEffect(() => {
    appOptionsChannel.send(options);
    optionsStorage.set(options);
  }, [options]);

  useForceUpdateOnMount();

  return (
    <>
      <RootStyles />
      <Holder ref={rootRef}>
        <MenuItem icon="Command" name="Open Shortcut">
          <ShortcutRecorder
            currentShortcut={options.shortcut}
            onShortcutPicked={(shortcut) => updateOptions({ shortcut })}
          />
        </MenuItem>
        <MenuItem icon="Power" name="Quit" onClick={handleClose} />
        <HelpHolder>
          <Help />
        </HelpHolder>
      </Holder>
    </>
  );
}
