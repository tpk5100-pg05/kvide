import { useMemo } from 'react';

import { Box, IconButton, List, ListItem, ListItemText, SpeedDial } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { Item, ItemListEditorProps } from './types';
import Prompt, { usePrompt } from '@/sections/Prompt';

ItemListEditor.defaultProps = {
  itemClass: 'item',
  compareFn: (a: Item, b: Item) => a.name.localeCompare(b.name),
};
function ItemListEditor({
  items,
  itemClass,
  compareFn,
  onItemCreated,
  onItemEdited,
  onItemDeleted,
}: ItemListEditorProps): JSX.Element {
  const [prompt, promptRef] = usePrompt();

  const onAddClicked = () => {
    if (!onItemCreated) return;

    prompt(`New ${itemClass}`, '').then((name) => {
      if (!name) return;
      onItemCreated({ name });
    });
  };
  const onEditClicked = (item: Item) => {
    if (!onItemEdited) return;
    prompt(`Edit ${itemClass}`, item.name).then((name) => {
      if (!name) return;
      onItemEdited({ ...item, name });
    });
  };
  const onDeleteClicked = (item: Item) => {
    if (!onItemDeleted) return;
    const confirmed = confirm(`Are you sure you want to delete ${item.name}?`);
    if (!confirmed) return;
    onItemDeleted(item);
  };

  const sortedItems = useMemo(() => {
    return [...items].sort(compareFn);
  }, [items, compareFn]);

  return (
    <Box flexGrow={1} sx={{ flexGrow: 1, height: '100vh', width: '100%', overflowY: 'scroll' }}>
      <List sx={{ paddingBottom: '6rem' }}>
        {sortedItems.map((item) => (
          <ListItem
            key={item.id}
            divider={true}
            sx={{ height: '6rem' }}
            secondaryAction={
              <>
                {onItemEdited && (
                  <IconButton
                    edge="end"
                    aria-label={`edit ${itemClass}`}
                    onClick={() => onEditClicked(item)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {onItemEdited && onItemDeleted && <span style={{ marginRight: '1rem' }}></span>}
                {onItemDeleted && (
                  <IconButton
                    edge="end"
                    aria-label={`edit ${itemClass}`}
                    onClick={() => onDeleteClicked(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </>
            }
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>

      <Prompt ref={promptRef} />

      {onItemCreated && (
        <SpeedDial
          onClick={() => onAddClicked()}
          ariaLabel={`create a new ${itemClass}`}
          title={`create a new ${itemClass}`}
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<AddIcon />}
        ></SpeedDial>
      )}
    </Box>
  );
}

export default ItemListEditor;
