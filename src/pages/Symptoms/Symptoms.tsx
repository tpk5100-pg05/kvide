import { Card } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Meta from '@/components/Meta';
import ItemListEditor from '@/components/ItemListEditor';
import { Item, ItemBodyOnly, ItemIdOnly } from '@/components/ItemListEditor/types';
import Loading from '@/components/Loading';
import useNotifications from '@/store/notifications';
import { addSymptom, deleteSymptom, editSymptom, querySymptoms } from '@/store/symptoms';

function Symptoms() {
  const [, notifications] = useNotifications();

  const onItemCreated = async (item: ItemBodyOnly) => {
    try {
      await addSymptom(item);
      notifications.push({ message: 'Symptom added' });
    } catch (e) {
      notifications.push({ message: 'Failed to add symptom' });
    }
  };
  const onItemEdited = async (item: Item) => {
    try {
      await editSymptom(item.id, item);
      notifications.push({ message: 'Symptom edited' });
    } catch (e) {
      notifications.push({ message: 'Failed to edit symptom' });
    }
  };
  const onItemDeleted = async (item: ItemIdOnly) => {
    try {
      await deleteSymptom(item.id);
      notifications.push({ message: 'Symptom deleted' });
    } catch (e) {
      notifications.push({ message: 'Failed to delete symptom' });
    }
  };

  const symptoms = useLiveQuery(() => querySymptoms());

  return (
    <>
      <Meta title="Symptoms" />
      <Card sx={{ mt: 3, mb: 3, pl: 5, pr: 5, width: '100%' }}>
        <h1>Symptoms</h1>
        {symptoms ? (
          <ItemListEditor
            items={symptoms}
            itemClass="symptom"
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

export default Symptoms;
