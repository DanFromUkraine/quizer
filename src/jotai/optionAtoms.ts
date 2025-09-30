import {
        getCardWithNewOptionId,
        getCardWithoutDeletedOptionId,
        getDerivedAtomWithIdb
} from '@/src/utils/jotai/mainDbUtils';
import {
        addEmptyOptionIdb,
        deleteOptionIdb,
        updateCardIdb,
        updateOptionIdb
} from '@/src/utils/idb/main/actions';
import { Option } from '@/src/types/mainDbGlobal';
import getUniqueID from '@/src/utils/getUniqueID';
import { updateExplicitCardAtom } from '@/src/jotai/cardAtoms';
import { explicitCardsAtomFamily, optionsAtomFamily } from '@/src/jotai/mainAtoms';
import { FullOptionFromText } from '@/src/utils/parseTextIntoCardsArray';
import { addEmptyOptionAtomHelper } from '@/src/utils/jotai/helpers';

export const updateOptionAtom = getDerivedAtomWithIdb(
        async (_get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption).then(() =>
                        console.debug('success option')
                );
                set(optionsAtomFamily(newOption.id), newOption);
        }
);

export const addEmptyOptionAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, cardId: string) => {
                const newId = getUniqueID();
                const newCard = getCardWithNewOptionId(get, cardId, newId);
                await updateCardIdb(mainDb, newCard);
                await addEmptyOptionIdb(mainDb, newId);
                set(explicitCardsAtomFamily(cardId), newCard);
                addEmptyOptionAtomHelper(set, newId);
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
                return (await set(
                        optionsAtomFamily(newOption.id),
                        newOption
                )) as void;
        }
);

export const deleteOptionViaTextAtom = getDerivedAtomWithIdb(
        async (_get, _set, mainDb, optionIdToDelete: string) => {
                await deleteOptionIdb(mainDb, optionIdToDelete);
                optionsAtomFamily.remove(optionIdToDelete);
        }
);

export const updateOptionViaTextAtom = getDerivedAtomWithIdb(
        async (
                _get,
                set,
                mainDb,
                newOptionData: FullOptionFromText,
                optionId: string
        ) => {
                const newOption = {
                        ...newOptionData,
                        id: optionId
                };
                await updateOptionIdb(mainDb, newOption);
                return set(optionsAtomFamily(optionId), newOption) as void;
        }
);
