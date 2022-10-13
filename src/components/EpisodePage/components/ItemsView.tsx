import { Button, Card, Checkbox, Collapse, Typography } from '@mui/material';
import { Box } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FlexBox } from '@/components/styled';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import AddIcon from '@mui/icons-material/Add';
import Prompt, { usePrompt } from '@/sections/Prompt';
import useNotifications from '@/store/notifications';

type ItemClass = {
  id: number;
  name: string;
};

const ItemsView = ({
  items,
  itemClass,
  icon,
  isEdit,
  onChange,
  onItemCreated,
  queryItems,
}: {
  items: ItemClass[];
  itemClass: string;
  icon: React.ReactNode;
  isEdit: boolean;
  onChange: (items: ItemClass[]) => void;
  onItemCreated: ({ name }: { name: string }) => Promise<ItemClass>;
  queryItems: () => Promise<ItemClass[]>;
}) => {
  const [open, setOpen] = useState(false);
  const [prompt, promptRef] = usePrompt();
  const [, notifications] = useNotifications();

  const [itemsMap, setItemsMap] = useState(
    items.reduce((prev: Map<number, boolean>, current: ItemClass) => {
      prev.set(current.id, true);
      return prev;
    }, new Map()),
  );

  const allItems = useLiveQuery(() => {
    return queryItems();
  });

  const onSymptomChange = (id: number) => {
    setItemsMap((prev) => {
      // A new map must be created so the object reference changes
      const newMap = new Map(prev);
      if (newMap.has(id)) {
        newMap.delete(id);
      } else {
        newMap.set(id, true);
      }

      onChange(allItems?.filter((item) => newMap.has(item.id) && newMap.get(item.id)) || []);

      return newMap;
    });
  };

  const onAddClicked = () => {
    prompt(`New ${itemClass}`, '').then((name) => {
      if (!name) return;
      onItemCreated({ name: name }).catch(() => {
        notifications.push({
          // Currently assuming this is the only thing that can go wrong as I'm too lazy to write a proper error parser
          message: `Failed to create ${itemClass}: ${itemClass} with that name already exists`,
        });
      });
    });
  };

  if (!allItems) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', cursor: 'pointer' }}>
      <Card>
        <FlexBox flexDirection={'column'}>
          <Box sx={{ width: '100%' }} component="div" onClick={() => setOpen(!open)}>
            <FlexBox sx={{ width: '100%', p: 2, alignItems: 'center' }}>
              {icon}
              <Typography variant="h6">{`${itemClass}s`}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              {open ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowUpIcon
                  sx={{ transform: 'rotate(180deg)', transisition: 'transform 1s' }}
                />
              )}
            </FlexBox>
          </Box>
          <Collapse in={open}>
            {isEdit ? (
              <>
                {' '}
                {allItems.map((item, index) => (
                  <FlexBox
                    key={index}
                    sx={{ borderTop: 1, p: 2, alignItems: 'center' }}
                    onClick={() => onSymptomChange(item.id)}
                  >
                    <Checkbox
                      color="info"
                      checked={itemsMap.has(item.id) && itemsMap.get(item.id)}
                    />
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </FlexBox>
                ))}
                <FlexBox sx={{ width: '100%', alignItems: 'center', p: 1 }} flexDirection="column">
                  <Button color="info" startIcon={<AddIcon />} onClick={onAddClicked}>
                    {`Add ${itemClass}`}
                  </Button>
                </FlexBox>
                <Prompt ref={promptRef} color="info" />
              </>
            ) : (
              allItems
                .filter((curr) => itemsMap.get(curr.id))
                .map((item, index) => (
                  <FlexBox key={index} sx={{ borderTop: 1, p: 2, alignItems: 'center' }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </FlexBox>
                ))
            )}
          </Collapse>
        </FlexBox>
      </Card>
    </Box>
  );
};

export default ItemsView;
