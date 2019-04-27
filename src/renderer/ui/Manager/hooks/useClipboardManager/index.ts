import { useState } from 'react';
import shortid from 'shortid';
import { useClipboardCallback } from './hooks';
import { usePersistedList } from '~app/services/hooks';

export interface ClipboardHistoryItemData {
  id: string;
  content: string;
  date: Date;
  lastCopyDate: Date;
  score: number;
  isBookmarkEnabled: boolean;
  isMaskEnabled: boolean;
}

export function useClipboardManager() {
  const { items, addItem, clear, updateItem, removeWhere } = usePersistedList<
    ClipboardHistoryItemData
  >('clipboard-history-list');

  useClipboardCallback((copiedContent) => {
    if (copiedContent.length > 500) {
      return;
    }

    // if same item is already in history - add score to it instead of creating copy
    const addedScoreToExistingItem = updateItem(
      (item) => item.content === copiedContent,
      (item) => {
        return { ...item, score: item.score + 1 };
      },
    );

    if (addedScoreToExistingItem) {
      return;
    }

    addItem({
      id: shortid.generate(),
      content: copiedContent,
      date: new Date(),
      lastCopyDate: new Date(),
      isBookmarkEnabled: false,
      isMaskEnabled: false,
      score: 0,
    });
  });

  function toggleBookmark(itemToToggle: ClipboardHistoryItemData) {
    updateItem(
      (item) => item.id === itemToToggle.id,
      (item) => {
        return { ...item, isBookmarkEnabled: !item.isBookmarkEnabled };
      },
    );
  }

  function toggleMask(itemToToggle: ClipboardHistoryItemData) {
    updateItem(
      (item) => item.id === itemToToggle.id,
      (item) => {
        return { ...item, isMaskEnabled: !item.isMaskEnabled };
      },
    );
  }

  function deleteItem(itemToDelete: ClipboardHistoryItemData) {
    removeWhere((item) => item.id === itemToDelete.id);
  }

  function popLastCopiedDate(itemCopied: ClipboardHistoryItemData) {
    updateItem(
      (item) => item.id === itemCopied.id,
      (item) => {
        return { ...item, lastCopyDate: new Date() };
      },
    );
  }

  return {
    items,
    toggleBookmark,
    deleteItem,
    clear,
    toggleMask,
    popLastCopiedDate,
  };
}
