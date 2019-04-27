import React from 'react';
import styled from 'styled-components';
import { ShortcutIndicator } from '~app/ui/keyboard';

const Holder = styled.div``;

const Title = styled.div`
  padding-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0;
  line-height: 1.33;
`;

const IconHolder = styled.div`
  padding-right: 15px;
  min-width: 50px;
`;

const Content = styled.div``;

export function Help() {
  return (
    <Holder>
      <Title>Help</Title>
      <Item>
        <IconHolder>
          <ShortcutIndicator shortcut="command+F" />
        </IconHolder>
        <Content> Bookmark selected item in clipboard history</Content>
      </Item>
      <Item>
        <IconHolder>
          <ShortcutIndicator shortcut="command+del" />
        </IconHolder>
        <Content>Remove item in clipboard history</Content>
      </Item>
      <Item>
        <IconHolder>
          <ShortcutIndicator shortcut="command+H" />
        </IconHolder>
        <Content>Mask item in clipboard history (password > p●●●●●●)</Content>
      </Item>
    </Holder>
  );
}
