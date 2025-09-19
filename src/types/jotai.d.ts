import { atom, WritableAtom } from 'jotai';

export type AtomFamily<T> = (id: string) => T;

export type WithInitialValue<Value> = {
        init: Value;
};

export type StringAtomAdapter = AtomFamily<
        WritableAtom<string, [newTitle: string], void>
>;
