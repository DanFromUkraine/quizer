import { atom, Getter, Setter, WritableAtom } from 'jotai';
import { Book, Card, MainDb, Option, StoreMap } from '@/src/types/mainDb';
import {
        booksFamilyAtom,
        booksIdsAtom,
        cardsFamilyAtom,
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

export function getBookWithUpdatedTitle(
        get: Getter,
        id: string,
        newTitle: string
): Book {
        const prevBook = get(booksFamilyAtom(id));
        return {
                ...prevBook,
                bookTitle: newTitle
        };
}

export function getNewBookWithFilteredIds(
        get: Getter,
        bookId: string,
        idToDelete: string
) {
        const prevBook = get(booksFamilyAtom(bookId));
        const filteredIds = getFilteredIds(prevBook.cardsIds, idToDelete);
        return {
                ...prevBook,
                filteredIds
        };
}

export function getBookWithNewId(get: Getter, bookId: string, cardId: string) {
        const prevBook = get(booksFamilyAtom(bookId));
        const updatedIds = [...prevBook.cardsIds, cardId];
        return {
                ...prevBook,
                cardsIds: updatedIds
        };
}

export function updateCardAtomHelper(set: Setter, newCard: Card) {
        const cardAtom = cardsFamilyAtom(newCard.id);
        set(cardAtom, newCard);
}

export function getCardWithUpdatedTitleHelper(
        get: Getter,
        id: string,
        newTitle: string
) {
        const prevCard = get(cardsFamilyAtom(id));
        return {
                ...prevCard,
                cardTitle: newTitle
        };
}

export function updateOptionAtomHelper(set: Setter, newOption: Option) {
        const optionAtom = optionsFamilyAtom(newOption.id);
        set(optionAtom, newOption);
}

export function getCardWithNewOptionId(
        get: Getter,
        cardId: string,
        optionId: string
) {
        const cardAtom = cardsFamilyAtom(cardId);
        const prevCard = get(cardAtom);
        const newIds = [...prevCard.optionsIds, optionId];

        return {
                ...prevCard,
                optionsIds: newIds
        };
}

export function addEmptyOptionAtomHelper(set: Setter, optionId: string) {
        const optionAtom = optionsFamilyAtom(optionId);
        const newOption = getTemplate('options', optionId);
        set(optionAtom, newOption);
}

export function getCardWithFilteredOptionsIds(
        get: Getter,
        cardId: string,
        optionId: string
) {
        const cardAtom = cardsFamilyAtom(cardId);
        const prevCard = get(cardAtom);
        const newIds = getFilteredIds(prevCard.optionsIds, optionId);

        return {
                ...prevCard,
                optionsIds: newIds
        };
}

export function getDerivedAtom<Args extends unknown[]>(
        callback: (
                get: Getter,
                set: Setter,
                mainDb: MainDb,
                ...args: Args
        ) => Promise<void> | void
): WritableAtom<null, Args, Promise<void> | void> {
        return atom<null, Args, Promise<void> | void>(
                null,
                async (get, set, ...args: Args) => {
                        const mainDb = get(mainDbAtom) as MainDb | undefined;
                        if (typeof mainDb === 'undefined') return;



                        try {
                                await callback(get, set, mainDb, ...args);
                        } catch (e) {
                                console.error(e);
                        }
                }
        ) as WritableAtom<null, Args, Promise<void> | void>;
}
