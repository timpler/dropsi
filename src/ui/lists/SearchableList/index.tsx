import React, { useState, useRef, useEffect, useCallback } from 'react';
import { memoize } from 'lodash';
import Mousetrap from 'mousetrap';
import styled from 'styled-components';
import { useSelectableIndex } from './hooks';
import { getFocusedItemsFromList } from './services';

import { SearchableListItem } from './Item';
import { SearchBar } from './SearchBar';
import { useUpdateInterval } from '~app/services/hooks';
import { fuzzyString, quickFuzzy } from '~app/services/strings';

const Holder = styled.div``;
const ItemsHolder = styled.div``;
const ItemHolder = styled.div``;

type Callback<Item, Result = void> = (item: Item) => Result;

type DetailedCallback<Item, AdditionalArg, Result = void> = (
  item: Item,
  arg: AdditionalArg,
) => Result;

interface Props<Item> {
  items: Item[];
  labelGetter: Callback<Item, string>;
  descriptionGetter: Callback<Item, string>;
  searchStringGetter?: Callback<Item, string>;
  keyGetter: Callback<Item, string>;
  onSelect?: Callback<Item, void>;
  onDelete?: Callback<Item, void>;
  onBookmarkToggle?: Callback<Item, void>;
  onMaskToggle?: Callback<Item, void>;
  isBookmarkEnabledGetter?: Callback<Item, boolean>;
  sorter?: (items: Item[]) => Item[];
  onVisibleItemsChange?: (items: Item[]) => void;
}

function defaultSorter<T>(items: T[]) {
  return items;
}

const memoizedFuzzy = memoize(
  fuzzyString,
  (fuzzy: string, full: string) => `${fuzzy}${full}`,
);

export function SearchableList<Item>({
  items,
  labelGetter,
  descriptionGetter,
  keyGetter,
  onSelect,
  onDelete,
  searchStringGetter = labelGetter,
  isBookmarkEnabledGetter,
  onBookmarkToggle,
  onMaskToggle,
  onVisibleItemsChange,
  sorter = defaultSorter,
}: Props<Item>) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useUpdateInterval(1000 * 30);

  const getFilteredItems = useCallback(
    memoize((keyword: string) => {
      const preparedKeyword = keyword.toLowerCase().trim();

      const filteredItems = items.filter((item) => {
        if (!keyword) {
          return true;
        }

        const fuzzyResult = memoizedFuzzy(
          preparedKeyword,
          searchStringGetter(item),
        );

        if (!fuzzyResult) {
          return false;
        }

        return !!fuzzyResult;
      });

      return sorter(filteredItems);
    }),
    [items],
  );

  const filteredItems = getFilteredItems(searchKeyword);

  const [activeIndex, setActiveIndex] = useSelectableIndex({
    max: filteredItems.length - 1,
  });

  const [itemsToShow, offset] = getFocusedItemsFromList(
    filteredItems,
    activeIndex,
    9,
  );

  useEffect(() => {
    const keyboard = new Mousetrap(holderRef.current);

    onVisibleItemsChange(itemsToShow);

    keyboard.bind(['enter', 'command+c'], () => {
      const selectedItem = filteredItems[activeIndex];
      onSelect(selectedItem);
    });

    keyboard.bind(['command+backspace', 'command+del'], () => {
      const selectedItem = filteredItems[activeIndex];
      onDelete(selectedItem);
    });

    keyboard.bind(['command+h'], () => {
      const selectedItem = filteredItems[activeIndex];
      onMaskToggle(selectedItem);
    });

    keyboard.bind(['command+f', 'command+b'], () => {
      const selectedItem = filteredItems[activeIndex];
      onBookmarkToggle(selectedItem);
    });

    return () => keyboard.reset();
  });

  function handleKeywordChange(keyword: string) {
    setSearchKeyword(keyword);
    setActiveIndex(0);
  }

  return (
    <Holder ref={holderRef}>
      <SearchBar value={searchKeyword} onValueChange={handleKeywordChange} />
      <ItemsHolder>
        {itemsToShow.map((item, index) => {
          const realIndex = index + offset;
          const key = keyGetter(item);
          const label = labelGetter(item);
          const description = descriptionGetter(item);
          const isBookmarkEnabled = isBookmarkEnabledGetter(item);

          const isActive = realIndex === activeIndex;

          return (
            <SearchableListItem
              item={item}
              isBookmarkEnabled={isBookmarkEnabled}
              isActive={isActive}
              key={key}
              index={index}
              label={label}
              description={description}
              onSelect={onSelect}
            />
          );
        })}
      </ItemsHolder>
    </Holder>
  );
}
