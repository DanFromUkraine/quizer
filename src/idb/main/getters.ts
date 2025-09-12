import { getDB } from '@/src/utils/database/getDb';
import { Book, Card, MainDb, MainDbSchema, Option } from '@/src/types/mainDb';
import { DB_NAMES } from '@/src/constants/dbNames';
import { UPGRADE_MAIN_DB } from '@/src/constants/mainDb';
import { getCatchCallback } from '@/src/utils/errorHandling/catchCallbackEnhanced';
import { getEmptyCardTemplate } from '@/src/idb/main/templates';

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

export async function getAllBooksFromAsyncDb(mainDb: Promise<MainDb>) {
        return (await mainDb)
                .getAll('books')
                .catch(
                        getCatchCallback(
                                "Get all values from idb's books store"
                        )
                );
}

export async function getAllCardsFromAsyncDb(mainDb: Promise<MainDb>) {
        return (await mainDb)
                .getAll('cards')
                .catch(
                        getCatchCallback(
                                "Get all values from idb's cards store"
                        )
                );
}

export async function getAllOptionsFromAsyncDb(mainDb: Promise<MainDb>) {
        return (await mainDb)
                .getAll('options')
                .catch(
                        getCatchCallback(
                                "Get all values from idb's options store"
                        )
                );
}

export function deleteBookIdb(mainDb: MainDb, bookId: string) {
        return mainDb
                .delete('books', bookId)
                .catch(
                        getCatchCallback(
                                `Delete book with id ${bookId} from IndexedD`
                        )
                );
}

export function deleteCardIdb(mainDb: MainDb, cardId: string) {
        return mainDb
                .delete('cards', cardId)
                .catch(
                        getCatchCallback(
                                `Delete card with id ${cardId} from IndexedDB`
                        )
                );
}

export function deleteOptionIdb(mainDb: MainDb, optionId: string) {
        return mainDb
                .delete('options', optionId)
                .catch(
                        getCatchCallback(
                                `Delete option with id ${optionId} from IndexedDB`
                        )
                );
}

export function updateBookIdb(mainDb: MainDb, newBook: Book) {
        return mainDb
                .put('books', newBook)
                .catch(
                        getCatchCallback(
                                `Update book with id ${newBook.id} in IndexedDB`
                        )
                );
}

export function updateCardIdb(mainDb: MainDb, newCard: Card) {
        return mainDb
                .put('cards', newCard)
                .catch(
                        getCatchCallback(
                                `Update card with id ${newCard.id} in IndexedDB`
                        )
                );
}

export function updateOptionIdb(mainDb: MainDb, newOption: Option) {
        return mainDb
                .put('options', newOption)
                .catch(
                        getCatchCallback(
                                `Update option with id ${newOption.id} in IndexedDB`
                        )
                );
}

export function addEmptyCardIdb(mainDb: MainDb, cardId: string) {
        const cardTemplate = getEmptyCardTemplate(cardId);
        return mainDb.add('cards', cardTemplate);
}
