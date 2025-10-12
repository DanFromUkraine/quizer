/*
 * 'todo' - update/delete/getAll for explicitCardStories
 *   'todo' - update/delete/getAll for typeInCardStories
 *     'todo' - update/delete/getAll for isCorrectCardStories */

import { getDB } from '@/src/utils/idb/getDb';
import {
        Book,
        ExplicitCard,
        ExplicitCardStory,
        IsCorrectCardStory,
        MainDbGlobal,
        MainDbSchema,
        Option,
        Story,
        TermDefinitionCard,
        TypeInCardStory
} from '@/src/types/mainDbGlobal';
import { DB_NAMES } from '@/src/constants/dbNames';
import { UPGRADE_MAIN_DB } from '@/src/constants/mainDb';
import { getCatchCallback } from '@/src/utils/errorHandling/catchCallbackEnhanced';
import { addEmptyRecord, deleteRecord, getAllRecordsAsync, updateRecord } from '@/src/utils/idb/main/factories';

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
export const getAllExplicitCardsFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => await getAllRecordsAsync(asyncMainDb, 'explicitCards');
export const getAllShortCardsFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => await getAllRecordsAsync(asyncMainDb, 'shortCards');
export const getAllOptionsFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => await getAllRecordsAsync(asyncMainDb, 'options');
export const getAllStoriesFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => getAllRecordsAsync(asyncMainDb, 'stories');
export const getAllExplicitCardStoriesFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => getAllRecordsAsync(asyncMainDb, 'explicitCardStories');
export const getAllTypeInCardStoriesFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => getAllRecordsAsync(asyncMainDb, 'typeInCardStories');
export const getAllIsCorrectCardStoriesFromAsyncDb = async (
        asyncMainDb: Promise<MainDbGlobal>
) => getAllRecordsAsync(asyncMainDb, 'isCorrectCardStories');

export const addEmptyBookIdb = (mainDb: MainDbGlobal, id: string) =>
        addEmptyRecord(mainDb, 'books', id);
export const addEmptyExplicitCardIdb = (mainDb: MainDbGlobal, id: string) =>
        addEmptyRecord(mainDb, 'explicitCards', id);
export const addEmptyShortCardIdb = (mainDb: MainDbGlobal, id: string) =>
        addEmptyRecord(mainDb, 'shortCards', id);
export const addEmptyOptionIdb = (mainDb: MainDbGlobal, id: string) =>
        addEmptyRecord(mainDb, 'options', id);

export const updateBookIdb = (mainDb: MainDbGlobal, newRecord: Book) =>
        updateRecord(mainDb, 'books', newRecord);
export const updateExplicitCardIdb = (
        mainDb: MainDbGlobal,
        newRecord: ExplicitCard
) => updateRecord(mainDb, 'explicitCards', newRecord);
export const updateShortCardIdb = (
        mainDb: MainDbGlobal,
        newRecord: TermDefinitionCard
) => updateRecord(mainDb, 'shortCards', newRecord);
export const updateOptionIdb = (mainDb: MainDbGlobal, newRecord: Option) =>
        updateRecord(mainDb, 'options', newRecord);
export const updateStoryIdb = (mainDb: MainDbGlobal, newRecord: Story) =>
        updateRecord(mainDb, 'stories', newRecord);
export const updateExplicitCardStoryIdb = (
        mainDb: MainDbGlobal,
        newRecord: ExplicitCardStory
) => updateRecord(mainDb, 'explicitCardStories', newRecord);
export const updateTypeInCardStoryIdb = (
        mainDb: MainDbGlobal,
        newRecord: TypeInCardStory
) => updateRecord(mainDb, 'typeInCardStories', newRecord);
export const updateIsCorrectCardStoryIdb = (
        mainDb: MainDbGlobal,
        newRecord: IsCorrectCardStory
) => updateRecord(mainDb, 'isCorrectCardStories', newRecord);

export const deleteBookIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'books', id);
export const deleteExplicitCardIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'explicitCards', id);
export const deleteShortCardIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'shortCards', id);
export const deleteOptionIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'options', id);
export const deleteStoryIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'stories', id);
export const deleteExplicitCardStoryIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'explicitCardStories', id);
export const deleteTypeInCardStoryIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'typeInCardStories', id);
export const deleteIsCorrectCardStoryIdb = (mainDb: MainDbGlobal, id: string) =>
        deleteRecord(mainDb, 'isCorrectCardStories', id);
