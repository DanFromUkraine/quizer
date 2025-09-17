import { Getter, WritableAtom } from 'jotai';

export type FamilyAtom<T> = (id: string) => WritableAtom<T, [T], unknown>;

export type WithInitialValue<Value> = {
        init: Value;
};


export type StringAtomAdapter =  AtomFamily<string, WritableAtom<string, [newValue: string], void>>;
