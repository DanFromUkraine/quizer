import { atom, Getter, Setter, WritableAtom } from 'jotai';
import {
        Book,
        Card,
        MainDbGlobal,
        ObjectStoreKeysNoHistory,
        StoreMap,
        Story
} from '@/src/types/mainDbGlobal';
import {
        booksFamilyAtom,
        cardsFamilyAtom,
        mainAtoms,
        optionsFamilyAtom
} from '@/src/jotai/mainAtoms';
import { getFilteredIds } from '@/src/utils/idb/idUtils';
import {
        getEmptyStoryTemplate,
        getTemplate
} from '@/src/utils/idb/main/templates';
import { currentBookIdAtom } from '@/src/jotai/idManagers';

export function getAtomFactory<
        K extends keyof Pick<StoreMap, ObjectStoreKeysNoHistory>
>(storeName: K) {
        return (
                id: string
        ): WritableAtom<StoreMap[K], [StoreMap[K]], unknown> =>
                atom(getTemplate(storeName, id) as StoreMap[K]);
}

export function getHistoryAtom(id: string) {
        return atom<Story>(getEmptyStoryTemplate(id));
}

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
                        const mainDb = get(mainAtoms) as
                                | MainDbGlobal
                                | undefined;
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
