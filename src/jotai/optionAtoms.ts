import {
        getCardWithNewOptionId,
        getCardWithoutDeletedOptionId,
        getDerivedAtom
} from '@/src/utils/jotai/mainDbUtils';
import {
        addEmptyOptionIdb,
        deleteOptionIdb,
        updateCardIdb,
        updateOptionIdb
} from '@/src/utils/idb/main/actions';
import { Option } from '@/src/types/mainDbGlobal';
import getUniqueID from '@/src/utils/getUniqueID';
import { updateCardAtom } from '@/src/jotai/cardAtoms';
import { cardsFamilyAtom, optionsFamilyAtom } from '@/src/jotai/mainAtoms';
import { ExplicitOptionDataStore } from '@/src/utils/parseTextIntoCardsArray';
import { addEmptyOptionAtomHelper } from '@/src/utils/jotai/helpers';

export const updateOptionAtom = getDerivedAtom(
        async (_get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption).then(() =>
                        console.debug('success option')
                );
                set(optionsFamilyAtom(newOption.id), newOption);
        }
);

export const addEmptyOptionAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string) => {
                const newId = getUniqueID();
                const newCard = getCardWithNewOptionId(get, cardId, newId);
                await updateCardIdb(mainDb, newCard);
                await addEmptyOptionIdb(mainDb, newId);
                set(cardsFamilyAtom(cardId), newCard);
                addEmptyOptionAtomHelper(set, newId);
        }
);

export const deleteOptionAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string, optionId: string) => {
                const newCard = getCardWithoutDeletedOptionId(
                        get,
                        cardId,
                        optionId
                );
                await deleteOptionIdb(mainDb, optionId);
                set(updateCardAtom, newCard);
                optionsFamilyAtom.remove(optionId);
        }
);

export const addNewOptionViaTextAtom = getDerivedAtom(
        async (_get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption);
                return (await set(
                        optionsFamilyAtom(newOption.id),
                        newOption
                )) as void;
        }
);

export const deleteOptionViaTextAtom = getDerivedAtom(
        async (_get, _set, mainDb, optionIdToDelete: string) => {
                await deleteOptionIdb(mainDb, optionIdToDelete);
                optionsFamilyAtom.remove(optionIdToDelete);
        }
);

export const updateOptionViaTextAtom = getDerivedAtom(
        async (
                _get,
                set,
                mainDb,
                newOptionData: ExplicitOptionDataStore,
                optionId: string
        ) => {
                const newOption = {
                        ...newOptionData,
                        id: optionId
                };
                await updateOptionIdb(mainDb, newOption);
                return set(optionsFamilyAtom(optionId), newOption) as void;
        }
);
