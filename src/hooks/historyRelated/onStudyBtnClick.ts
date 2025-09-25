'use client';

import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { booksAndStoriesAssociationsAtom } from '@/src/jotai/mainAtoms';
import { useRouter } from 'next/navigation';

export default function useStudyButtonClickHandler(bookId: string) {
        const router = useRouter();
        return useAtomCallback(useCallback((get, set) => {
                const booksAndStoriesAssociations = get(booksAndStoriesAssociationsAtom);
                if (bookId in booksAndStoriesAssociations) {

                }
        }, []));
}
