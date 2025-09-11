'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { addEmptyBookAtom, booksIdsAtom } from '@/app/lib/jotai/MainDbAtom';

export default function RenderCollections() {
        const ids = useAtomValue(booksIdsAtom);
        const addBook = useSetAtom(addEmptyBookAtom);
        console.log({ ids });

        return (
                <div
                        className='grid grid-cols-2 w-full h-fit gap-4 max-sm:grid-cols-1
    '
                        onClick={addBook}>
                        hello
                </div>
        );
}
