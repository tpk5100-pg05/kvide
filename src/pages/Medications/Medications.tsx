import { useLiveQuery } from 'dexie-react-hooks';
import Meta from '@/components/Meta';
import ItemListEditor from '@/components/ItemListEditor';
import { Item, ItemBodyOnly, ItemIdOnly } from '@/components/ItemListEditor/types';
import Loading from '@/components/Loading';
import useNotifications from '@/store/notifications';
import {
  addMedication,
  deleteMedication,
  editMedication,
  queryMedications,
} from '@/store/medications';

function Medications() {
  const [, notifications] = useNotifications();

  const onItemCreated = async (item: ItemBodyOnly) => {
    try {
      await addMedication(item);
      notifications.push({ message: 'Medication added' });
    } catch (e) {
      notifications.push({ message: 'Failed to add medication' });
    }
  };
  const onItemEdited = async (item: Item) => {
    try {
      await editMedication(item.id, item);
      notifications.push({ message: 'Medication edited' });
    } catch (e) {
      notifications.push({ message: 'Failed to edit medication' });
    }
  };
  const onItemDeleted = async (item: ItemIdOnly) => {
    try {
      await deleteMedication(item.id);
      notifications.push({ message: 'Medication deleted' });
    } catch (e) {
      notifications.push({ message: 'Failed to delete medication' });
    }
  };

  const medications = useLiveQuery(() => queryMedications());

  return (
    <>
      <Meta title="Medications" />
      <h1>Medications</h1>
      {medications ? (
        <ItemListEditor
          items={medications}
          itemClass="medication"
          onItemEdited={onItemEdited}
          onItemDeleted={onItemDeleted}
          onItemCreated={onItemCreated}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Medications;
