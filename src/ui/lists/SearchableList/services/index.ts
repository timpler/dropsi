export function getFocusedItemsFromList<T>(
  items: T[],
  index: number,
  itemsToShow: number,
): [T[], number] {
  if (items.length <= itemsToShow) {
    return [items, 0];
  }

  if (index >= items.length) {
    index = items.length - 1;
  }
  const previousItemDesiredCount = Math.floor(itemsToShow / 2);
  const nextItemsDesiredCount = itemsToShow - previousItemDesiredCount;

  const realStartIndex = index - previousItemDesiredCount;
  const startIndex = Math.max(0, realStartIndex);
  const endIndex = index + nextItemsDesiredCount;

  const negativeItemsCount = realStartIndex < 0 ? Math.abs(realStartIndex) : 0;

  return [items.slice(startIndex, endIndex + negativeItemsCount), startIndex];
}
