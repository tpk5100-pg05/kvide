import { Card } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Meta from '@/components/Meta';
import ItemListEditor from '@/components/ItemListEditor';
import { Item, ItemBodyOnly, ItemIdOnly } from '@/components/ItemListEditor/types';
import Loading from '@/components/Loading';
import useNotifications from '@/store/notifications';
import { addTrigger, deleteTrigger, editTrigger, queryTriggers } from '@/store/triggers';

function Triggers() {
  const [, notifications] = useNotifications();

  const onItemCreated = async (item: ItemBodyOnly) => {
    try {
      await addTrigger(item);
      notifications.push({ message: 'Trigger added' });
    } catch (e) {
      notifications.push({ message: 'Failed to add trigger' });
    }
  };
  const onItemEdited = async (item: Item) => {
    try {
      await editTrigger(item.id, item);
      notifications.push({ message: 'Trigger edited' });
    } catch (e) {
      notifications.push({ message: 'Failed to edit trigger' });
    }
  };
  const onItemDeleted = async (item: ItemIdOnly) => {
    try {
      await deleteTrigger(item.id);
      notifications.push({ message: 'trigger deleted' });
    } catch (e) {
      notifications.push({ message: 'Failed to delete trigger' });
    }
  };

  const triggers = useLiveQuery(() => queryTriggers());

  return (
    <>
      <Meta title="triggers" />
      <Card sx={{ mt: 3, mb: 3, pl: 5, pr: 5, width: '100%' }}>
        <h1>triggers</h1>
        {triggers ? (
          <ItemListEditor
            items={triggers}
            itemClass="trigger"
            onItemEdited={onItemEdited}
            onItemDeleted={onItemDeleted}
            onItemCreated={onItemCreated}
          />
        ) : (
          <Loading />
        )}
      </Card>
    </>
  );
}

export default Triggers;
