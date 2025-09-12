export type FamilyAtom<T> = (id: string) => WritableAtom<T, [T], unknown>;
