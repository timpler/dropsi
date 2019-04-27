import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Holder = styled.div``;
const Input = styled.input`
  padding: 20px;
  font: inherit;
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  color: inherit;
  background-color: #0002;
`;

const ItemHolder = styled.div``;

type Callback<Item, Result = void> = (item: Item) => Result;

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

export function SearchBar({ value, onValueChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Holder>
      <Input
        ref={inputRef}
        placeholder="Search..."
        onKeyDown={(event) => {
          // Don't move cursor on up/down arrow pressed
          if ([38, 40].includes(event.keyCode)) {
            event.preventDefault();
            return;
          }

          if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            return;
          }
        }}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </Holder>
  );
}
