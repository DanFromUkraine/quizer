import { PrimitiveAtom } from 'jotai';

export type FamilyAtom<T> = (id: string) => PrimitiveAtom<T>;
