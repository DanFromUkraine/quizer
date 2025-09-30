import { atom } from 'jotai';
import {
        withdrawAllIdsToAddFromBankAtom,
        withdrawAllIdsToRemoveFromBankAtom
} from '@/src/utils/jotai/idsBank';
import {
        FatherFamilyAtom,
        FatherUpdateActionAtom
} from '@/src/types/jotai/cardsTextParserFactories';
import { getListWhereNoSuchIds } from '@/src/utils/getLists';
import { Book, ExplicitCard } from '@/src/types/mainDbGlobal';

export const fatherUpdateLogicAtom = atom(
        null,
        (
                get,
                set,
                {
                        fatherId,
                        fatherFamily,
                        updateFatherAtom,
                        otherData
                }: {
                        fatherId: string;
                        fatherFamily: FatherFamilyAtom;
                        updateFatherAtom: FatherUpdateActionAtom;
                        otherData?: Partial<Book | ExplicitCard>;
                }
        ) => {
                const prevFatherData = get(fatherFamily(fatherId));
                const idsToInclude = get(
                        withdrawAllIdsToAddFromBankAtom(fatherId)
                );
                const idsToExclude = get(
                        withdrawAllIdsToRemoveFromBankAtom(fatherId)
                );
                let changedFatherIds = [...prevFatherData.childrenIds];

                if (idsToInclude.length > 0) {
                        changedFatherIds.push(...idsToInclude);
                }

                if (idsToExclude.length > 0) {
                        changedFatherIds = getListWhereNoSuchIds(
                                prevFatherData.childrenIds,
                                idsToExclude
                        );
                }

                const newFatherData = {
                        ...prevFatherData,
                        ...otherData,
                        childrenIds: changedFatherIds
                };

                set(updateFatherAtom, newFatherData);
        }
);
