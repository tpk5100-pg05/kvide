export interface ItemBodyOnly {
  name: string;
}

export interface ItemIdOnly {
  id: number;
}

export interface Item extends ItemBodyOnly, ItemIdOnly {}

export interface ItemListEditorProps {
  items: Item[];
  itemClass?: string;
  compareFn?: (a: Item, b: Item) => number;
  onItemCreated?: (item: ItemBodyOnly) => unknown;
  onItemEdited?: (item: Item) => unknown;
  onItemDeleted?: (item: ItemIdOnly) => unknown;
}
