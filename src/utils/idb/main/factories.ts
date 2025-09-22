import {
        Book,
        Card,
        MainDbGlobal,
        MainDbSchema,
        ObjectStores,
        Option,
        StoreMap
} from '@/src/types/mainDbGlobal';
import { getCatchCallback } from '@/src/utils/errorHandling/catchCallbackEnhanced';
import { getTemplate } from '@/src/utils/idb/main/templates';

function getItemTypeForLog(objectStore: keyof MainDbSchema) {
        /* Example:
         * input is 'cards', output - 'card'.
         * Useful, when we want to specify item type (like card) in the error log */

        return objectStore.toString().slice(-1);
}

export async function getAllRecordsAsync<Key extends keyof StoreMap>(
        mainDb: Promise<MainDbGlobal>,
        objectStore: Key
) {
        return (await mainDb)
                .getAll(objectStore)
                .catch(
                        getCatchCallback(
                                `Couldn't get all records from ${objectStore} object store from idb`
                        )
                ) as Promise<StoreMap[Key][]>;
}

export function addEmptyRecord(
        mainDb: MainDbGlobal,
        objectStore: ObjectStores,
        id: string
) {
        const itemTypeForLog = getItemTypeForLog(objectStore);
        const newRecord = getTemplate(objectStore, id);

        return mainDb
                .add(objectStore, newRecord)
                .catch(
                        getCatchCallback(
                                `Couldn't add empty ${itemTypeForLog} with id ${id} to ${objectStore} objectStore in idb`
                        )
                );
}

export function updateRecord(
        mainDb: MainDbGlobal,
        objectStore: ObjectStores,
        newRecord: Book | Card | Option
) {
        const itemTypeForLog = getItemTypeForLog(objectStore);
        return mainDb
                .put(objectStore, newRecord)
                .catch(
                        getCatchCallback(
                                `Couldn't update ${itemTypeForLog} with id ${newRecord.id} in ${objectStore} objectStore in idb`
                        )
                );
}

export function deleteRecord(
        mainDb: MainDbGlobal,
        objectStore: ObjectStores,
        deleteId: string
) {
        const itemTypeForLog = getItemTypeForLog(objectStore);
        return mainDb
                .delete(objectStore, deleteId)
                .catch(
                        getCatchCallback(
                                `Couldn't delete ${itemTypeForLog} from ${objectStore} objectStore, from idb`
                        )
                );
}
