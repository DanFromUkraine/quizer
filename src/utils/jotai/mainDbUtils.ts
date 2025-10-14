import { atom, Getter } from 'jotai';
import type { Book, ExplicitCard, StoreMap } from '@/src/types/mainDbGlobal';
import {
        booksAtomFamily,
        explicitCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import { getFilteredIds } from '@/src/utils/idb/idUtils';
import { getTemplate } from '@/src/utils/idb/main/templates';
import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { getListWhereNoSuchIds, getListWithSuchIds } from '@/src/utils/lists';
import { AvailableCardTypes } from '@/src/types/globals';

export function getAtomFactory<K extends keyof StoreMap>(storeName: K) {
        return (id: string) => atom(getTemplate(storeName, id));
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
