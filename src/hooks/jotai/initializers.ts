import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { ObjWithId } from '@/src/types/globals';
import { FamilyAtom } from '@/src/types/jotaiGlobal';

export function useInitFamilyAtom<Item extends ObjWithId>(
        familyAtom: FamilyAtom<Item>
) {
        return useAtomCallback(
                useCallback((_get, set, array: Item[]) => {
                        array.forEach((item) => set(familyAtom(item.id), item));
                }, [])
        );
}
