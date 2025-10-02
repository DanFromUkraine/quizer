import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { ObjWithId } from '@/src/types/globals';
import { AtomFamily } from '@/src/types/jotaiGlobal';
import { WritableAtom } from 'jotai';

export type FamilyAtomForInit<Item extends ObjWithId> = AtomFamily<
        string,
        WritableAtom<Item, [Item], unknown>
>;

export function useInitAtomFamily<Item extends ObjWithId>(
        familyAtom: FamilyAtomForInit<Item>
) {
        return useAtomCallback(
                useCallback((_get, set, array: Item[]) => {
                        array.forEach((item) => set(familyAtom(item.id), item));
                }, [])
        );
}
