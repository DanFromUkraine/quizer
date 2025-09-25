import { getDB } from '@/src/utils/idb/getDb';
import {
        Book,
        Card,
        MainDbGlobal,
        MainDbSchema,
        Option,
        Story
} from '@/src/types/mainDbGlobal';
import { DB_NAMES } from '@/src/constants/dbNames';
import { UPGRADE_MAIN_DB } from '@/src/constants/mainDb';
import { getCatchCallback } from '@/src/utils/errorHandling/catchCallbackEnhanced';
import {
        addEmptyRecord,
        deleteRecord,
        getAllRecordsAsync,
        updateRecord
} from '@/src/utils/idb/main/factories';

export function getMainDb() {
        return getDB<MainDbSchema>({
                dbName: DB_NAMES.MAIN,
                upgradeAction: UPGRADE_MAIN_DB
        }).catch(
                getCatchCallback(
                        'Get Main db instance from IndexedDB wrapped with idb'
                )
        );
}

export const getAllBooksFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => await getAllRecordsAsync(asyncMainDb, 'books');
export const getAllCardsFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => await getAllRecordsAsync(asyncMainDb, 'cards');
export const getAllOptionsFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => await getAllRecordsAsync(asyncMainDb, 'options');
export const getAllStoriesFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => getAllRecordsAsync(asyncMainDb, 'history');

export const addEmptyBookIdb = (mainDb: MainDbGlobal, id: string) =>
        addEmptyRecord(mainDb, 'books', id);
export const addEmptyCardIdb = (mainDb: MainDbGlobal, id: string) =>
        addEmptyRecord(mainDb, 'cards', id);
export const addEmptyOptionIdb = (mainDb: MainDbGlobal, id: string) =>
        addEmptyRecord(mainDb, 'options', id);

export const updateBookIdb = (mainDb: MainDbGlobal, newRecord: Book) =>
        updateRecord(mainDb, 'books', newRecord);
export const updateCardIdb = (mainDb: MainDbGlobal, newRecord: Card) =>
        updateRecord(mainDb, 'cards', newRecord);
export const updateOptionIdb = (mainDb: MainDbGlobal, newRecord: Option) =>
        updateRecord(mainDb, 'options', newRecord);
export const updateStoryIdb = (mainDb: MainDbGlobal, newRecord: Story) =>
        updateRecord(mainDb, 'history', newRecord);

export const deleteBookIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'books', id);
export const deleteCardIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'cards', id);
export const deleteOptionIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'options', id);
export const deleteStoryIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'history', id);
