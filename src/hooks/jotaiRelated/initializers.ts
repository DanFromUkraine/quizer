import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { ObjWithId } from '@/src/types/globals';
import { AtomFamily } from '@/src/types/jotaiGlobal';
import { WritableAtom } from 'jotai';

export function useInitFamilyAtom<Item extends ObjWithId>(
        familyAtom: AtomFamily<string, WritableAtom<Item, [Item], unknown>>
) {
        return useAtomCallback(
                useCallback((_get, set, array: Item[]) => {
                        array.forEach((item) => set(familyAtom(item.id), item));
                }, [])
        );
}
