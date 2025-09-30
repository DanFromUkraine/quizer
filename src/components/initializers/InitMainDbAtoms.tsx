'use client';

//#task: db must close connection on unmount
//#refactor: I don't like this callback chain. Looks kinda awful

import {
        getAllBooksFromAsyncDb,
        getAllExplicitCardsFromAsyncDb,
        getAllOptionsFromAsyncDb,
        getAllStoriesFromAsyncDb,
        getMainDb
} from '@/src/utils/idb/main/actions';

import { useSetAtom } from 'jotai';
import {
        FamilyAtomForInit,
        useInitAtomFamily
} from '@/src/hooks/jotaiRelated/initializers';
import {
        booksAtomFamily,
        explicitCardsAtomFamily,
        storiesAtomFamily,
        mainDbAtom,
        optionsAtomFamily
} from '@/src/jotai/mainAtoms';
import { pickIds } from '@/src/utils/idb/idUtils';
import dynamic from 'next/dynamic';
import { booksIdsAtom, storyIdsAtom } from '@/src/jotai/idManagers';
import { Story } from '@/src/types/mainDbGlobal';

export function InitAllMainDbAtoms_DO_NOT_IMPORT() {
        const asyncMainDb = getMainDb();
        const setMainDb = useSetAtom(mainDbAtom);
        const setBooksIds = useSetAtom(booksIdsAtom);
        const setHistoryIds = useSetAtom(storyIdsAtom);

        const initBooksAtomFamily = useInitAtomFamily(booksAtomFamily);
        const initExplicitCardsAtomFamily = useInitAtomFamily(explicitCardsAtomFamily);
        const initOptionsAtomFamily = useInitAtomFamily(optionsAtomFamily);
        const initStoriesAtomFamily = useInitAtomFamily(
                storiesAtomFamily as FamilyAtomForInit<Story>
        );

        getAllBooksFromAsyncDb(asyncMainDb).then((books) => {
                setBooksIds(pickIds(books));
                initBooksAtomFamily(books);
        });

        getAllStoriesFromAsyncDb(asyncMainDb).then((stories) => {
                setHistoryIds(pickIds(stories));
                initStoriesAtomFamily(stories);
        });

        getAllExplicitCardsFromAsyncDb(asyncMainDb).then((cards) => {
                initExplicitCardsAtomFamily(cards);
        });

        getAllOptionsFromAsyncDb(asyncMainDb).then((options) => {
                initOptionsAtomFamily(options);
        });

        asyncMainDb.then((db) => {
                setMainDb(db);
        });

        return <></>;
}

export default dynamic(
        () =>
                import('@/src/components/initializers/InitMainDbAtoms').then(
                        (modules) => modules.InitAllMainDbAtoms_DO_NOT_IMPORT
                ),
        { ssr: false }
);
