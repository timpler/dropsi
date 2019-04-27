import React from 'react';
import { memoize } from 'lodash';
import color from 'color';
import styled from 'styled-components';

const Holder = styled.div``;
const ColorHolder = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 10px;
  border: 1px solid #fff4;
  transition: 0.3s all;

  &:hover {
    transform: scale(1.5);
  }
`;

interface Props {
  content: string;
}

const parseColor = memoize((input: string) => {
  try {
    return color(input);
  } catch (error) {
    return null;
  }
});

export function Helper({ content }: Props) {
  const parsedColor = parseColor(content) || parseColor(`#${content}`);

  return (
    <Holder>
      {parsedColor && (
        <ColorHolder style={{ backgroundColor: parsedColor.toString() }} />
      )}
    </Holder>
  );
}
