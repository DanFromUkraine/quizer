import { atom, Getter, Setter, WritableAtom } from 'jotai';
import { Book, Card, MainDbGlobal, Option, StoreMap } from '@/src/types/mainDbGlobal';
import {
        booksFamilyAtom,
        booksIdsAtom,
        cardsFamilyAtom,
        currentBookIdAtom,
        deleteCardAtom,
        deleteOptionAtom,
        mainDbAtom,
        optionsFamilyAtom
} from '@/src/jotai/mainDbAtom';
import { getFilteredIds } from '@/src/utils/idb/idUtils';
import { getTemplate } from '@/src/utils/idb/main/templates';

export function getAtomFactory<K extends keyof StoreMap>(storeName: K) {
        return (
                id: string
        ): WritableAtom<StoreMap[K], [StoreMap[K]], unknown> =>
                atom(getTemplate(storeName, id) as StoreMap[K]);
}

export function addEmptyBookAtomHelper(set: Setter, id: string) {
        const newBookAtom = booksFamilyAtom(id);
        const bookTemplate = getTemplate('books', id);
        set(booksIdsAtom, (prev) => [...prev, id]);
        set(newBookAtom, bookTemplate);
}

export function addEmptyCardAtomHelper(set: Setter, id: string) {
        const newCardAtom = cardsFamilyAtom(id);
        const cardTemplate = getTemplate('cards', id);
        set(newCardAtom, cardTemplate);
}

export function deleteBookAtomHelper(set: Setter, id: string) {
        set(booksIdsAtom, (prev) => prev.filter((lastId) => lastId !== id));
        booksFamilyAtom.remove(id);
}

export function updateBookAtomHelper(set: Setter, newBook: Book) {
        const bookAtom = booksFamilyAtom(newBook.id);
        set(bookAtom, newBook);
}

export function deleteOptionAtomHelper() {}

export function getNewBookWithFilteredIds(
        get: Getter,
        idToDelete: string
): Book {
        const bookId = get(currentBookIdAtom);
        const prevBook = get(booksFamilyAtom(bookId));
        const filteredIds = getFilteredIds(prevBook.childrenIds, idToDelete);
        return {
                ...prevBook,
                childrenIds: filteredIds
        };
}

export function getBookWithNewId(
        get: Getter,
        bookId: string,
        cardId: string
): Book {
        const prevBook = get(booksFamilyAtom(bookId));
        const updatedIds = [...prevBook.childrenIds, cardId];
        return {
                ...prevBook,
                childrenIds: updatedIds
        };
}

export function updateCardAtomHelper(set: Setter, newCard: Card) {
        const cardAtom = cardsFamilyAtom(newCard.id);
        set(cardAtom, newCard);
}

export function updateOptionAtomHelper(set: Setter, newOption: Option) {
        const optionAtom = optionsFamilyAtom(newOption.id);
        set(optionAtom, newOption);
}

export function getCardWithNewOptionId(
        get: Getter,
        cardId: string,
        optionId: string
): Card {
        const cardAtom = cardsFamilyAtom(cardId);
        const prevCard = get(cardAtom);
        const newIds = [...prevCard.childrenIds, optionId];

        return {
                ...prevCard,
                childrenIds: newIds
        };
}

export function addEmptyOptionAtomHelper(set: Setter, optionId: string) {
        const optionAtom = optionsFamilyAtom(optionId);
        const newOption = getTemplate('options', optionId);
        set(optionAtom, newOption);
}

export function getCardWithoutDeletedOptionId(
        get: Getter,
        cardId: string,
        optionId: string
): Card {
        const cardAtom = cardsFamilyAtom(cardId);
        const prevCard = get(cardAtom);
        const newIds = getFilteredIds(prevCard.childrenIds, optionId);

        return {
                ...prevCard,
                childrenIds: newIds
        };
}

export function getDerivedAtom<Args extends unknown[]>(
        callback: (
                get: Getter,
                set: Setter,
                mainDb: MainDbGlobal,
                ...args: Args
        ) => Promise<void>
): WritableAtom<null, Args, Promise<void>> {
        return atom<null, Args, Promise<void>>(
                null,
                async (get, set, ...args: Args) => {
                        const mainDb = get(mainDbAtom) as MainDbGlobal | undefined;
                        if (typeof mainDb === 'undefined') return;

                        try {
                                await callback(get, set, mainDb, ...args);
                        } catch (e) {
                                return await Promise.reject(e);
                        }
                }
        ) as WritableAtom<null, Args, Promise<void>>;
}

export function getCardsAsText(cardsIds: string[], get: Getter) {
        return cardsIds.map((cardId) => {
                const { cardTitle, childrenIds } = get(cardsFamilyAtom(cardId));
                return `\n&& ${cardTitle} ${getOptionsAsText(childrenIds, get).join('')}`;
        });
}

export function getOptionsAsText(optionsIds: string[], get: Getter) {
        return optionsIds.map((optionId) => {
                const { optionTitle, isCorrect } = get(
                        optionsFamilyAtom(optionId)
                );
                return `\n \t %% ${isCorrect ? '%correct%' : ''} ${optionTitle}`;
        });
}

export async function deleteCardsOnBookDeleteAtomHelper(
        get: Getter,
        set: Setter,
        bookId: string
) {
        const { childrenIds } = get(booksFamilyAtom(bookId));
        for await (const cardId of childrenIds) {
                await set(deleteCardAtom, cardId);
        }
}

export async function deleteOptionsOnCardDeleteAtomHelper(
        get: Getter,
        set: Setter,
        cardId: string
) {
        const { childrenIds } = get(cardsFamilyAtom(cardId));
        for await (const optionId of childrenIds) {
                await set(deleteOptionAtom, cardId, optionId);
        }
}
