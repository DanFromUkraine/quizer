import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';


const idsBankFamilyAtom = atomFamily((id: string) => atom<string[]>([]));
export const addIdToBankFamilyAtom = atomFamily((id: string) =>
        atom(null, (get, set, newId: string) => {
                const bankCellAtom = idsBankFamilyAtom(id);
                const prevIds = get(bankCellAtom);
                set(bankCellAtom, [...prevIds, newId]);
        })
);
export const withdrawAllIdsFromBankFamilyAtom = atomFamily((id: string) =>
        atom((get) => {
                const bankCell = idsBankFamilyAtom(id);
                const allIds = get(bankCell);
                idsBankFamilyAtom.remove(id);
                return allIds;
        })
);
