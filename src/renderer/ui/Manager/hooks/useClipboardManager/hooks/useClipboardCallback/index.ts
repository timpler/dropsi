import { useState, useEffect } from 'react';
import { clipboard } from 'electron';

function getClipboardContent() {
  return clipboard.readText();
}

export function useClipboardCallback(
  onClipboardChange: (content: string) => void,
) {
  let currentClipboardContent = getClipboardContent();

  useEffect(() => {
    const timer = setInterval(() => {
      const newClipboardContent = getClipboardContent();

      if (!newClipboardContent) {
        return;
      }

      if (newClipboardContent === currentClipboardContent) {
        return;
      }

      currentClipboardContent = newClipboardContent;
      onClipboardChange(newClipboardContent);
    }, 200);

    return () => clearInterval(timer);
  }, [onClipboardChange]);
}
