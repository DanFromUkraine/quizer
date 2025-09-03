'use client';

import { atom, WritableAtom, type PrimitiveAtom } from 'jotai';
import { RESET } from 'jotai/utils';

type SetStateActionWithReset<Value> =
        | Value
        | typeof RESET
        | ((prev: Value) => Value | typeof RESET);
type WithInitialValue<Value> = {
        init: Value;
};

export function getAtomAddToArrayItem<Item>(
        targetAtom: WritableAtom<Item[], any, void>
) {
        return atom(null, (_get, set, newItem: Item) => {
                set(targetAtom, (prev: Item[]) => [...prev, newItem]);
        });
}
