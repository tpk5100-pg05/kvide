import { Box, Card } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Meta from '@/components/Meta';
import ItemListEditor from '@/components/ItemListEditor';
import { Item, ItemBodyOnly, ItemIdOnly } from '@/components/ItemListEditor/types';
import Loading from '@/components/Loading';
import useNotifications from '@/store/notifications';
import { addTreatment, deleteTreatment, editTreatment, queryTreatments } from '@/store/treatments';

function Treatments() {
  const [, notifications] = useNotifications();

  const onItemCreated = async (item: ItemBodyOnly) => {
    try {
      await addTreatment(item);
      notifications.push({ message: 'Treatment added' });
    } catch (e) {
      notifications.push({ message: 'Failed to add treatment' });
    }
  };
  const onItemEdited = async (item: Item) => {
    try {
      await editTreatment(item.id, item);
      notifications.push({ message: 'Treatment edited' });
    } catch (e) {
      notifications.push({ message: 'Failed to edit treatment' });
    }
  };
  const onItemDeleted = async (item: ItemIdOnly) => {
    try {
      await deleteTreatment(item.id);
      notifications.push({ message: 'Treatment deleted' });
    } catch (e) {
      notifications.push({ message: 'Failed to delete treatment' });
    }
  };

  const treatments = useLiveQuery(() => queryTreatments());

  return (
    <>
      <Meta title="Treatments" />
      <Box sx={{ height: '100%', width: '100%', p: 2, position: 'relative' }}>
        <Card
          sx={{
            p: 2,
            width: '100%',
            height: '100%',
          }}
        >
          <h1>Treatments</h1>
          {treatments ? (
            <ItemListEditor
              items={treatments}
              itemClass="treatment"
              onItemEdited={onItemEdited}
              onItemDeleted={onItemDeleted}
              onItemCreated={onItemCreated}
            />
          ) : (
            <Loading />
          )}
        </Card>
      </Box>
    </>
  );
}

export default Treatments;
