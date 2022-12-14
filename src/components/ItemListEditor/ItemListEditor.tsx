import { useMemo } from 'react';

import { Box, Fab, IconButton, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { Item, ItemListEditorProps } from './types';
import Prompt, { usePrompt } from '@/sections/Prompt';
import { useRecoilState } from 'recoil';
import { bottomHeight } from '@/state';

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
  const [bottom] = useRecoilState(bottomHeight);

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
    <Box
      flexGrow={1}
      sx={{
        flexGrow: 1,
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
      }}
    >
      <List sx={{}}>
        {sortedItems.map((item) => (
          <ListItem
            key={item.id}
            divider={true}
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
            <ListItemText>{item.name}</ListItemText>
          </ListItem>
        ))}
      </List>

      <Prompt ref={promptRef} />

      {onItemCreated && (
        <Fab
          color="primary"
          onClick={onAddClicked}
          aria-label={`create a new ${itemClass}`}
          title={`create a new ${itemClass}`}
          sx={{ position: 'fixed', bottom: 16 + bottom, right: 16 }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
}

export default ItemListEditor;
