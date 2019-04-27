import React, { useEffect } from 'react';
import { sortBy } from 'lodash';
import { distanceInWords } from 'date-fns';
import Mousetrap from 'mousetrap';
import styled from 'styled-components';

import { useForceUpdateOnMount } from '~app/services/hooks';

import { useClipboardManager, ClipboardHistoryItemData } from './hooks';
import { SearchableList } from '~app/ui';
import { clipboard } from 'electron';
import {
  closeWindowChannel,
  visibleClipboardItemsChannel,
} from '~app/channels';
import { dateAge } from '~app/services/dates';

const Holder = styled.div``;

function itemsSorter(items: ClipboardHistoryItemData[]) {
  return sortBy(items, (item: ClipboardHistoryItemData) => {
    const timeStamp = new Date(item.lastCopyDate).getTime();
    if (item.isBookmarkEnabled) {
      return Number.MIN_SAFE_INTEGER - timeStamp;
    }

    return timeStamp * -1;

    return -item.score || 0;
  });
}

function getItemLabel(item: ClipboardHistoryItemData) {
  if (!item.isMaskEnabled) {
    return item.content;
  }

  return `${item.content.charAt(0)}●●●●●●`;
}

function getItemDescription(item: ClipboardHistoryItemData) {
  return dateAge(item.lastCopyDate);
}

function handleVisibleItemsChange(items: ClipboardHistoryItemData[]) {
  visibleClipboardItemsChannel.send(items.slice(0, 10).map(getItemLabel));
}

export function ClipboardManager() {
  const {
    items,
    toggleBookmark,
    toggleMask,
    deleteItem,
    clear,
    popLastCopiedDate,
  } = useClipboardManager();

  function handleItemSelected(item: ClipboardHistoryItemData) {
    clipboard.writeText(item.content);
    popLastCopiedDate(item);
    closeWindowChannel.send();
  }

  return (
    <Holder>
      <SearchableList
        descriptionGetter={getItemDescription}
        onVisibleItemsChange={handleVisibleItemsChange}
        onDelete={deleteItem}
        sorter={itemsSorter}
        onMaskToggle={toggleMask}
        isBookmarkEnabledGetter={(item) => item.isBookmarkEnabled}
        onBookmarkToggle={toggleBookmark}
        items={items}
        keyGetter={(item) => item.id}
        labelGetter={getItemLabel}
        searchStringGetter={(item) => item.content}
        onSelect={handleItemSelected}
      />
    </Holder>
  );
}
