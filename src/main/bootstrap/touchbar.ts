import { visibleClipboardItemsChannel } from '~app/channels';
import { debounce } from 'lodash';
import { TouchBar, clipboard } from 'electron';
import { getWindow } from '../window';

const {
  TouchBarLabel,
  TouchBarButton,
  TouchBarSpacer,
  TouchBarSlider,
  TouchBarScrubber,
  TouchBarGroup,
} = TouchBar;

function addEllipsisIfNeeded(input: string, maxLength = 15) {
  if (input.length <= maxLength) {
    return input;
  }

  return `${input.substr(0, 14)}…`;
}

function handleItemsChange(items: string[], onSelected: () => void) {
  const touchBar = new TouchBar({
    items: items.map((item) => {
      return new TouchBarButton({
        label: addEllipsisIfNeeded(item.replace(/\n/g, '')),
        click: () => {
          clipboard.writeText(item);
          onSelected();
        },
      });
    }),
  });

  getWindow().setTouchBar(touchBar);
}

export function handleTouchbarUpdates(onSelected: () => void) {
  const debouncedHandleItemsChange = debounce(handleItemsChange, 200);
  visibleClipboardItemsChannel.subscribe((items) => {
    debouncedHandleItemsChange(items, onSelected);
  });
}
