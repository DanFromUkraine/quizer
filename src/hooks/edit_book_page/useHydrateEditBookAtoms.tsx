'use client';

import { useHydrateAtoms } from 'jotai/utils';
import { currentBookIdAtom } from '@/src/jotai/mainDbAtom';

export default function useHydrateEditBookAtoms({
        bookId
}: {
        bookId: string;
}) {
        useHydrateAtoms([[currentBookIdAtom, bookId]]);


}
