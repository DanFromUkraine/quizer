'use client';

import { useHydrateAtoms } from 'jotai/utils';
import { currentBookIdAtom } from '@/src/jotai/idManagers';

export default function useHydrateBookIdAtom({
        bookId
}: {
        bookId: string;
}) {
        useHydrateAtoms([[currentBookIdAtom, bookId]], {
                dangerouslyForceHydrate: true
        });
}
