import { atom, PrimitiveAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { AtomFamily, WithInitialValue } from '@/src/types/jotaiGlobal';

const newIdsBankFamilyAtom = atomFamily(() => atom<string[]>([]));
const deleteIdsBankFamilyAtom = atomFamily(() => atom<string[]>([]));

type Bank = AtomFamily<
        unknown,
        PrimitiveAtom<string[]> & WithInitialValue<string[]>
>;

const getAddSetter = (bankFamilyAtom: Bank) =>
        atom(null, (get, set, bankCellId: string, newId: string) => {
                const bankCellAtom = bankFamilyAtom(bankCellId);
                const prevIds = get(bankCellAtom);
                set(bankCellAtom, [...prevIds, newId]);
        });

const getWithdrawSetter = (bankFamilyAtom: Bank, bankCellId: string) =>
        atom((get) => {
                const bankCell = bankFamilyAtom(bankCellId);
                const allIds = get(bankCell);
                bankFamilyAtom.remove(bankCellId);
                return allIds;
        });

export const addIdToAddToBankAtom = getAddSetter(newIdsBankFamilyAtom);
export const withdrawAllIdsToAddFromBankAtom = (bankCellId: string) =>
        getWithdrawSetter(newIdsBankFamilyAtom, bankCellId);

export const addIdToRemoveToBankAtom = getAddSetter(deleteIdsBankFamilyAtom);
export const withdrawAllIdsToRemoveFromBankAtom = (bankCellId: string) =>
        getWithdrawSetter(deleteIdsBankFamilyAtom, bankCellId);
