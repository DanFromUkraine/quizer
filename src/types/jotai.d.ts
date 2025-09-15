import { Getter, WritableAtom } from 'jotai';

export type FamilyAtom<T> = (id: string) => WritableAtom<T, [T], unknown>;

export type WithInitialValue<Value> = {
        init: Value;
};


