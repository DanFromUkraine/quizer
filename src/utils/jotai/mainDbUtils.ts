import { atom, Getter, Setter, WritableAtom } from 'jotai';
import {
        Book,
        ExplicitCard,
        MainDbGlobal,
        StoreMap,
        Story
} from '@/src/types/mainDbGlobal';
import {
        booksAtomFamily,
        explicitCardsAtomFamily,
        mainDbAtom,
        optionsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import { getFilteredIds } from '@/src/utils/idb/idUtils';
import {
        getEmptyStoryTemplate,
        getTemplate
} from '@/src/utils/idb/main/templates';
import { currentBookIdAtom } from '@/src/jotai/idManagers';
import {
        getCardType,
        getListWhereNoSuchIds,
        getListWithSuchIds
} from '@/src/utils/lists';
import { AvailableCardTypes } from '@/src/types/globals';
import { CARD_TYPE_UNKNOWN } from '@/src/constants/errors';

export function getAtomFactory<K extends keyof Omit<StoreMap, 'history'>>(
        storeName: K
) {
        return (id: string) => atom(getTemplate(storeName, id));
}

export function getHistoryAtom(id: string) {
        return atom<Story>(getEmptyStoryTemplate(id));
}

export function getNewBookWithDeletedCardId(
        get: Getter,
        idToDelete: string
): Book {
        /* The probability that such ids exists in both explicitCardIds and shortCardIds is so low, that should not be considered*/
        const bookId = get(currentBookIdAtom);
        const { cardIdsOrder, explicitCardIds, shortCardIds, ...other } = get(
                booksAtomFamily(bookId)
        );
        const newCardIdsOrder = getListWhereNoSuchIds(cardIdsOrder, [
                idToDelete
        ]);
        const newExplicitCardIdsList = getListWhereNoSuchIds(explicitCardIds, [
                idToDelete
        ]);
        const newShortCardIdsList = getListWhereNoSuchIds(shortCardIds, [
                idToDelete
        ]);

        return {
                ...other,
                cardIdsOrder: newCardIdsOrder,
                explicitCardIds: newExplicitCardIdsList,
                shortCardIds: newShortCardIdsList
        };
}

export function getBookWithNewId({
        cardId,
        cardType,
        bookId,
        get
}: {
        cardId: string;
        cardType: AvailableCardTypes;
        bookId: string;
        get: Getter;
}): Book {
        const { cardIdsOrder, ...other } = get(booksAtomFamily(bookId));
        const newCardIdsOrder = getListWithSuchIds(cardIdsOrder, [cardId]);

        return cardType === 'explicit'
                ? {
                          ...other,
                          cardIdsOrder: newCardIdsOrder,
                          explicitCardIds: getListWithSuchIds(
                                  other.explicitCardIds,
                                  [cardId]
                          )
                  }
                : {
                          ...other,
                          cardIdsOrder: newCardIdsOrder,
                          shortCardIds: getListWithSuchIds(other.shortCardIds, [
                                  cardId
                          ])
                  };
}

export function getCardWithNewOptionId(
        get: Getter,
        cardId: string,
        optionId: string
): ExplicitCard {
        const cardAtom = explicitCardsAtomFamily(cardId);
        const prevCard = get(cardAtom) as ExplicitCard;
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
): ExplicitCard {
        const cardAtom = explicitCardsAtomFamily(cardId);
        const prevCard = get(cardAtom) as ExplicitCard;
        const newIds = getFilteredIds(prevCard.childrenIds, optionId);

        return {
                ...prevCard,
                childrenIds: newIds
        };
}

export function getDerivedAtomWithIdb<Args extends unknown[]>(
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
                        const mainDb = get(mainDbAtom) as
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

export function getCardsAsText({
        cardIdsOrder,
        explicitCardIds,
        shortCardIds,
        get
}: {
        cardIdsOrder: string[];
        explicitCardIds: string[];
        shortCardIds: string[];
        get: Getter;
}) {
        return cardIdsOrder.map((cardId) => {
                const cardType = getCardType({
                        targetId: cardId,
                        explicitCardIds,
                        shortCardIds
                });
                if (cardType === 'short') {
                        const { term, definition } = get(
                                shortCardsAtomFamily(cardId)
                        );
                        return `\n @@ ${term} - ${definition}`;
                } else if (cardType === 'explicit') {
                        const { cardTitle, childrenIds } = get(
                                explicitCardsAtomFamily(cardId)
                        );

                        return `\n && ${cardTitle} ${getOptionsAsText(childrenIds, get)}`;
                } else {
                        throw CARD_TYPE_UNKNOWN;
                }
        }).join('')
}

export function getOptionsAsText(optionsIds: string[], get: Getter) {
        return optionsIds.map((optionId) => {
                const { optionTitle, isCorrect } = get(
                        optionsAtomFamily(optionId)
                );
                return `\n \t %% ${isCorrect ? '%correct%' : ''} ${optionTitle}`;
        });
}
