import React, { useEffect } from 'react';
import styled from 'styled-components';
import { symbolizeShortcut } from '~app/services/shortcuts';

const Holder = styled.div`
  line-height: 1em;
  border: 1px solid;
  border-radius: 0.25em;
  padding: 0.2em 0.25em 0.1em;
  opacity: 0.5;
  font-size: 14px;
  flex-shrink: 1;
  flex-grow: 0;
  display: inline-flex;
`;

interface Props {
  shortcut: string;
  onPressed?: () => void;
}

export function ShortcutIndicator({ shortcut, onPressed }: Props) {
  useEffect(() => {
    const keyboard = new Mousetrap(document.body);

    keyboard.bind(shortcut, () => {
      onPressed && onPressed();
    });

    return () => keyboard.reset();
  }, [shortcut, onPressed]);

  const symbolizedShortcut = symbolizeShortcut(shortcut);

  return <Holder>{symbolizedShortcut}</Holder>;
}
