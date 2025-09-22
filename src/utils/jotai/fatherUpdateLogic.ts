import { atom } from 'jotai';
import {
        withdrawAllIdsToAddFromBankAtom,
        withdrawAllIdsToRemoveFromBankAtom
} from '@/src/utils/jotai/idsBank';
import {
        FatherFamilyAtom,
        FatherUpdateActionAtom
} from '@/src/types/jotai/cardsTextParserFactories';
import {
        getListWhereNoSuchIds,
        getListWithSuchIds
} from '@/src/utils/getLists';
import { Book, Card } from '@/src/types/mainDbGlobal';

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
                        otherData?: Partial<Book | Card>;
                }
        ) => {
                const prevFatherData = get(fatherFamily(fatherId));
                const idsToInclude = get(
                        withdrawAllIdsToAddFromBankAtom(fatherId)
                );
                const idsToExclude = get(
                        withdrawAllIdsToRemoveFromBankAtom(fatherId)
                );

                console.debug({ idsToInclude, idsToExclude, prevFatherData });

                if (idsToInclude.length > 0) {
                        const fatherIdsWithIncludedNewOnes = getListWithSuchIds(
                                prevFatherData.childrenIds,
                                idsToInclude
                        );
                        const newFatherData = {
                                ...prevFatherData,
                                ...otherData,
                                childrenIds: fatherIdsWithIncludedNewOnes
                        };
                        console.debug({ newFatherData });
                        set(updateFatherAtom, newFatherData);
                }

                if (idsToExclude.length > 0) {
                        const fatherIdsWithNoSuchId = getListWhereNoSuchIds(
                                prevFatherData.childrenIds,
                                idsToExclude
                        );
                        const newFatherData = {
                                ...prevFatherData,
                                otherData,
                                childrenIds: fatherIdsWithNoSuchId
                        };
                        console.debug({ newFatherData, idsToExclude });

                        set(updateFatherAtom, newFatherData);
                }
        }
);
