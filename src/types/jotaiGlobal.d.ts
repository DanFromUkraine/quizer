import { WritableAtom } from 'jotai';


export type StringAtomAdapter = AtomFamily<
        WritableAtom<string, [newTitle: string], void>
>;

type WithInitialValue<Value> = {
        init: Value;
};

export interface AtomFamily<Param, AtomType> {
        (param: Param): AtomType;
        getParams(): Iterable<Param>;
        remove(param: Param): void;
        setShouldRemove(shouldRemove: ShouldRemove<Param> | null): void;
        /**
         * fires when a atom is created or removed
         * This API is for advanced use cases, and can change without notice.
         */
        unstable_listen(callback: Callback<Param, AtomType>): Cleanup;
}
