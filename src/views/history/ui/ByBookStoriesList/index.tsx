'use client';

import { useAtomValue } from 'jotai';
import { storiesSortedByBookAtom } from '@/src/jotai/historyAtoms';
import BookAndItsStories from './BookAndItsStories';
import NothingYetMessage from '@/src/shared/ui/NothingYet';

export default function ByBookStoriesList() {
    const books = useAtomValue(storiesSortedByBookAtom);
    return (
        <ul>
            {books.map((book, i) => (
                <BookAndItsStories key={i} {...book} />
            ))}
            <NothingYetMessage
                message='No stories at all yet'
                listLength={books.length}
            />
        </ul>
    );
}
