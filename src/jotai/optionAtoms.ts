import {
        getCardWithNewOptionId,
        getCardWithoutDeletedOptionId,
} from '@/src/utils/jotai/mainDbUtils';
import {
        addEmptyOptionIdb,
        deleteOptionIdb,
        updateExplicitCardIdb,
        updateOptionIdb
} from '@/src/utils/idb/main/actions';
import { Option } from '@/src/types/mainDbGlobal';
import getUniqueID from '@/src/utils/getUniqueID';
import { updateExplicitCardAtom } from '@/src/jotai/cardAtoms';
import {
        explicitCardsAtomFamily,
        optionsAtomFamily
} from '@/src/jotai/mainAtoms';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/getDerivedAtomWithIdb';

export const updateOptionAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption);
                set(optionsAtomFamily(newOption.id), newOption);
        }
);

export const addEmptyOptionAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newId = getUniqueID();
                const newCard = getCardWithNewOptionId(get, cardId, newId);
                await updateExplicitCardIdb(mainDb, newCard);
                await addEmptyOptionIdb(mainDb, newId);
                set(explicitCardsAtomFamily(cardId), newCard);
        }
);

export const deleteOptionAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string, optionId: string) => {
                const newCard = getCardWithoutDeletedOptionId(
                        get,
                        cardId,
                        optionId
                );
                await deleteOptionIdb(mainDb, optionId);
                set(updateExplicitCardAtom, newCard);
                optionsAtomFamily.remove(optionId);
        }
);

export const addNewOptionViaTextAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption);
                return set(optionsAtomFamily(newOption.id), newOption) as void;
        }
);

export const deleteOptionViaTextAtom = getDerivedAtomWithIdb(
        async (_get, _set, mainDb, optionIdToDelete: string) => {
                await deleteOptionIdb(mainDb, optionIdToDelete);
                optionsAtomFamily.remove(optionIdToDelete);
        }
);
