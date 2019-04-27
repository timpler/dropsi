import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import * as Icon from 'react-feather';

type IconName = keyof typeof Icon;

const Holder = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;
  border-bottom: 1px solid #8882;
  padding: 5px 20px;

  ${(props: { isClickable: boolean }) => {
    if (!props.isClickable) {
      return;
    }

    return css`
      cursor: pointer;

      &:hover {
        background-color: #8881;
      }
    `;
  }}
`;
const IconHolder = styled.div`
  display: flex;
`;
const LabelHolder = styled.div`
  padding: 0 15px;
  flex-grow: 1;
  flex-shrink: 1;
`;
const ContentHolder = styled.div``;

interface Props {
  name: string;
  subtitle?: string;
  onClick?: () => void;
  children?: ReactNode;
  icon: IconName;
}

export function MenuItem({ name, subtitle, onClick, children, icon }: Props) {
  const IconElem = Icon[icon];
  return (
    <Holder onClick={onClick} isClickable={!!onClick}>
      <IconHolder>
        <IconElem size={16} />
      </IconHolder>
      <LabelHolder>{name}</LabelHolder>
      <ContentHolder>{children}</ContentHolder>
    </Holder>
  );
}
