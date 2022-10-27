import { Trigger, TriggerInsertable, TriggerUpdatable } from '@/store/types';
import { loggbokDB, TriggerSchema } from '@/store/loggbok-db';
import { NotUndefined } from '@/utils/not-undefined';
import { TriggerOrder, TriggerOrderBy, TriggerQuery } from '@/store/triggers/types';

const addTrigger = async (Trigger: TriggerInsertable) => {
  const res = await loggbokDB.triggers.add({ name: Trigger.name } as TriggerSchema);
  const createdTrigger = await loggbokDB.triggers.get(res);

  if (!createdTrigger) {
    throw new Error('Could not create Trigger');
  }

  return createdTrigger;
};

const editTrigger = async (id: NotUndefined<Trigger['id']>, trigger: TriggerUpdatable) => {
  await loggbokDB.triggers.update(id, trigger);
};

const getTrigger = async (id: NotUndefined<Trigger['id']>): Promise<Trigger> => {
  const Trigger = await loggbokDB.triggers.get(id);

  if (!Trigger) {
    throw new Error('Could not find Trigger');
  }

  return Trigger;
};

const queryTriggers = async (
  query: TriggerQuery = {},
  order: TriggerOrder = 'asc',
  orderBy: TriggerOrderBy = 'id',
) => {
  let foundTriggers = await Promise.resolve(
    !query.ids
      ? loggbokDB.triggers.toCollection()
      : loggbokDB.triggers.where('id').anyOf(query.ids),
  );

  // filter out deleted Triggers
  foundTriggers = foundTriggers.and((trigger) => !!trigger.deleted === !!query.deleted);

  if (typeof query.name_regex !== 'undefined') {
    foundTriggers = foundTriggers.and((trigger) => !!query.name_regex?.test(trigger.name));
  }

  if (order === 'desc') {
    foundTriggers = foundTriggers.reverse();
  }

  return foundTriggers.sortBy(orderBy);
};

const deleteTrigger = async (id: NotUndefined<Trigger['id']>) => {
  const isTriggerUsed = await loggbokDB.episodes.where('TriggerIds').equals(id).count();

  // soft delete if Trigger is used in at least one episode
  if (isTriggerUsed) {
    await loggbokDB.triggers.update(id, { deleted: true });
  } else {
    await loggbokDB.triggers.delete(id);
  }
};

export { addTrigger, editTrigger, getTrigger, queryTriggers, deleteTrigger };
