import React, { useEffect, memo, useCallback } from 'react';
import Mousetrap from 'mousetrap';
import styled from 'styled-components';
import { ShortcutIndicator } from '~app/ui/keyboard';
import { useUpdateInterval } from '~app/services/hooks';

import { Helper } from './Helper';

const Holder = styled.div`
  padding: 0 12px 0 20px;
  margin-top: 1px;
  display: flex;
  align-items: center;
  background-color: ${(props: Partial<Props>) =>
    props.isActive ? '#fff1' : '#fff0'};
  &:hover {
    background-color: #8881;
  }

  border-right: 8px solid #fff;
  border-right-color: ${(props: Partial<Props>) =>
    props.isBookmarkEnabled ? '#855bff' : '#fff0'};
`;
const LabelHolder = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  flex-shrink: 1;
  padding-right: 10px;

  cursor: pointer;
`;

const DescriptionHolder = styled.div`
  white-space: nowrap;
  opacity: 0.25;
  padding-left: 10px;
  text-align: right;
  min-width: 40px;
`;
const FavIndicatorHolder = styled.div`
  padding-right: 1em;
  cursor: pointer;
`;

type Callback<Item, Result = void> = (item: Item) => Result;

interface Props<Item = any> {
  item: Item;
  label: string;
  description: string;
  index: number;
  onSelect: (item: Item) => void;
  isActive: boolean;
  isBookmarkEnabled: boolean;
}

function SearchableListItemRaw<Item>({
  label,
  description,
  index,
  item,
  onSelect,
  isActive,
  isBookmarkEnabled,
}: Props<Item>) {
  const keyboardIndex = index + 1;

  const canHaveShortcut = keyboardIndex >= 1 && keyboardIndex <= 9;

  const handlePressed = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  return (
    <Holder isActive={isActive} isBookmarkEnabled={isBookmarkEnabled}>
      <LabelHolder onClick={() => onSelect(item)}>
        {label}
        &nbsp;
        <Helper content={label} />
      </LabelHolder>

      {canHaveShortcut && (
        <ShortcutIndicator
          shortcut={`command+${keyboardIndex}`}
          onPressed={handlePressed}
        />
      )}
      <DescriptionHolder>{description}</DescriptionHolder>
    </Holder>
  );
}

export const SearchableListItem: typeof SearchableListItemRaw = memo(
  SearchableListItemRaw,
);
