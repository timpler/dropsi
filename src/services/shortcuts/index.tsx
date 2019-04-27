import React, { useEffect } from 'react';
import styled from 'styled-components';

const symbolsMap = {
  command: '⌘',
  meta: '⌘',
  option: '⌥',
  control: '⌃',
  shift: '⇧',
  del: '⌫',
  backspace: '⌫',
  enter: '↵',
};

export function symbolizeShortcut(shortcut: string) {
  let shortcutWithSymbols = shortcut;

  Object.keys(symbolsMap).forEach((symbolKey: keyof typeof symbolsMap) => {
    shortcutWithSymbols = shortcutWithSymbols.replace(
      symbolKey,
      symbolsMap[symbolKey],
    );
  });

  return shortcutWithSymbols;
}
