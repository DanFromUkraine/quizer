import getUniqueID from '@/src/utils/getUniqueID';
import {
        getBookWithNewId,
        getDerivedAtomWithIdb,
        getNewBookWithDeletedCardId
} from '@/src/utils/jotai/mainDbUtils';
import {
        explicitCardsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import {
        addEmptyExplicitCardIdb,
        addEmptyShortCardIdb,
        deleteExplicitCardIdb,
        deleteShortCardIdb,
        updateBookIdb,
        updateExplicitCardIdb,
        updateShortCardIdb
} from '@/src/utils/idb/main/actions';
import { ExplicitCard, TermDefinitionCard } from '@/src/types/mainDbGlobal';
import {
        deleteOptionsOnCardDeleteAtomHelper,
        updateBookAtomHelper
} from '@/src/utils/jotai/helpers';
import { currentBookIdAtom } from '@/src/jotai/idManagers';
import { atom, Setter } from 'jotai';
import {
        FullCardFromText,
        FullOptionFromText
} from '@/src/types/cardsTextParser';
import {
        getListForInsert,
        getListForUpdate,
        getListWhereNoSuchIds,
        getListWithIdsForDelete,
        getListWithSuchIds
} from '@/src/utils/lists';
import {
        deleteOptionViaTextAtom,
        updateOptionAtom
} from '@/src/jotai/optionAtoms';

export const addEmptyExplicitCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb) => {
                const cardId = getUniqueID();
                const bookId = get(currentBookIdAtom);
                const newBook = getBookWithNewId({
                        get,
                        bookId,
                        cardId,
                        cardType: 'explicit'
                });
                await updateBookIdb(mainDb, newBook);
                await addEmptyExplicitCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
        }
);

export const addEmptyTermShortCard = getDerivedAtomWithIdb(
        async (get, set, mainDb) => {
                const cardId = getUniqueID();
                const bookId = get(currentBookIdAtom);
                const newBook = getBookWithNewId({
                        get,
                        bookId,
                        cardId,
                        cardType: 'short'
                });
                await updateBookIdb(mainDb, newBook);
                await addEmptyShortCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
        }
);

export const updateExplicitCardAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newCard: ExplicitCard) => {
                await updateExplicitCardIdb(mainDb, newCard);
                set(explicitCardsAtomFamily(newCard.id), newCard);
        }
);

export const updateShortCardAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newCard: TermDefinitionCard) => {
                await updateShortCardIdb(mainDb, newCard);
                set(shortCardsAtomFamily(newCard.id), newCard);
        }
);

export const deleteExplicitCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithDeletedCardId(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteExplicitCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                await deleteOptionsOnCardDeleteAtomHelper(get, set, cardId);
                explicitCardsAtomFamily.remove(cardId);
        }
);

export const deleteShortCardAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithDeletedCardId(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteShortCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                explicitCardsAtomFamily.remove(cardId);
        }
);

export const deleteExplicitCardViaTextAtom = getDerivedAtomWithIdb(async(get, set, mainDb, cardId: string) => {
        await deleteExplicitCardIdb(mainDb, cardId);
        explicitCardsAtomFamily.remove(cardId);
})

export const deleteShortCardViaTextAtom = getDerivedAtomWithIdb(async(get, set, mainDb, cardId: string) => {
        await deleteShortCardIdb(mainDb, cardId);
        shortCardsAtomFamily.remove(cardId);
})

type WithId = {
        id: string;
};

type InsertOptionReducer = (
        acc: string[],
        option: FullOptionFromText
) => string[];
type DeleteOptionReducer = (acc: string[], deleteOptionId: string) => string[];
type UpdateOptionCallback = (option: FullOptionFromText, index: number) => void;

function getReducerForInsertOptionsAndInitData(
        set: Setter
): [InsertOptionReducer, string[]] {
        const newOptionIds: string[] = [];
        return [
                (_acc, { optionTitle, isCorrect }) => {
                        const newOptionId = getUniqueID();
                        newOptionIds.push(newOptionId);
                        set(updateOptionAtom, {
                                id: newOptionId,
                                optionTitle,
                                isCorrect
                        });
                        return newOptionIds;
                },
                []
        ];
}

function getReducerForDeleteOptionsAndInitData(
        set: Setter
): [DeleteOptionReducer, string[]] {
        const optionIdsToDelete: string[] = [];

        return [
                (_acc, optionId) => {
                        optionIdsToDelete.push(optionId);
                        set(deleteOptionViaTextAtom, optionId);
                        return optionIdsToDelete;
                },
                []
        ];
}

function getUpdateOptionCallback({
        optionIds,
        set
}: {
        optionIds: string[];
        set: Setter;
}): UpdateOptionCallback {
        return (option, index) => {
                const optionId = optionIds[index];
                set(updateOptionAtom, {
                        id: optionId,
                        ...option
                });
        };
}

function updateCardAtomHelper({
        optionIdsToInsert,
        optionIdsToDelete,
        optionIds,
        set,
        card: { options: _options, ...usefulCardData }
}: {
        optionIdsToInsert: string[];
        optionIdsToDelete: string[];
        optionIds: string[];
        card: FullCardFromText & WithId;
        set: Setter;
}) {
        let newOptionIds: string[] = optionIds;

        if (optionIdsToInsert.length > 0) {
                newOptionIds = getListWithSuchIds(optionIds, optionIdsToInsert);
        } else if (optionIdsToDelete.length > 0) {
                newOptionIds = getListWhereNoSuchIds(
                        optionIds,
                        optionIdsToDelete
                );
        }

        set(updateExplicitCardAtom, {
                ...usefulCardData,
                childrenIds: newOptionIds
        });
}

export const updateExplicitCardViaText = atom(
        null,
        (get, set, newCard: FullCardFromText & WithId) => {
                const { childrenIds } = get(
                        explicitCardsAtomFamily(newCard.id)
                );
                const options = newCard.options;

                console.debug({ options });

                const optionIdsToInsert = getListForInsert(
                        options,
                        childrenIds
                ).reduce<string[]>(
                        ...getReducerForInsertOptionsAndInitData(set)
                );
                const optionIdsToDelete = getListWithIdsForDelete(
                        options,
                        childrenIds
                ).reduce<string[]>(
                        ...getReducerForDeleteOptionsAndInitData(set)
                );

                getListForUpdate(options, childrenIds).forEach(
                        getUpdateOptionCallback({
                                optionIds: childrenIds,
                                set
                        })
                );

                updateCardAtomHelper({
                        optionIds: childrenIds,
                        optionIdsToInsert,
                        optionIdsToDelete,
                        card: newCard,
                        set
                });
        }
);
