import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MouseTrap from 'mousetrap';

import { addRecordToMousetrap } from './services';
import { symbolizeShortcut } from '~app/services/shortcuts';

addRecordToMousetrap(MouseTrap);

const Holder = styled.div`
  background-color: #8884;
  border-radius: 50px;
  padding: 10px 15px;
  cursor: pointer;
  user-select: none;
`;

interface Props {
  currentShortcut: string;
  onShortcutPicked: (shortcut: string) => void;
}

export function ShortcutRecorder({ currentShortcut, onShortcutPicked }: Props) {
  const [isRecording, setIsRecording] = useState(false);

  function record() {
    const handler = new MouseTrap();

    setIsRecording(true);

    (MouseTrap as any).record(([shortcut]: string[]) => {
      setIsRecording(false);
      onShortcutPicked && onShortcutPicked(shortcut);
    });
  }

  function getLabel() {
    if (isRecording) {
      return `Recording...`;
    }

    if (!currentShortcut) {
      return `No shortcut`;
    }

    return symbolizeShortcut(currentShortcut);
  }

  return <Holder onClick={record}>{getLabel()}</Holder>;
}
