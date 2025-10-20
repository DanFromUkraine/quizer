'use client';

import { useAtomValue } from 'jotai';
import { storiesSortedByBookAtom } from '@/src/jotai/historyAtoms';
import BookAndItsStories from '@/src/components/history_page/ByBookStoriesList/client';
import NothingYetMessage from '@/src/components/general/NothingYet';

export default function ByBookStoriesList() {
        const books = useAtomValue(storiesSortedByBookAtom);
        return (
                <ul>
                        {books.map((book, i) => (
                                <BookAndItsStories key={i} {...book} />
                        ))}
                        <NothingYetMessage message='No stories at all yet' listLength={books.length}/>
                </ul>
        );
}
