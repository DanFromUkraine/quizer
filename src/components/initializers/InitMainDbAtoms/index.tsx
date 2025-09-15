'use client';

//#task: db must close connection on unmount
//#refactor: I don't like this callback chain. Looks kinda awful

import {
        getAllBooksFromAsyncDb,
        getAllCardsFromAsyncDb,
        getAllOptionsFromAsyncDb,
        getMainDb
} from '@/src/utils/idb/main/actions';

import { useSetAtom } from 'jotai';
import { useInitFamilyAtom } from '@/src/hooks/jotai/initializers';
import {
        booksFamilyAtom,
        booksIdsAtom,
        cardsFamilyAtom,
        mainDbAtom,
        optionsFamilyAtom
} from '@/src/jotai/mainDbAtom';
import { pickIds } from '@/src/utils/idb/idUtils';
import dynamic from 'next/dynamic';

export function InitAllMainDbAtoms_DO_NOT_IMPORT() {
        console.log({ window: typeof window });

        const asyncMainDb = getMainDb();
        const setMainDb = useSetAtom(mainDbAtom);
        const setBooksIds = useSetAtom(booksIdsAtom);
        const initBooksFamilyAtom = useInitFamilyAtom(booksFamilyAtom);
        const initCardsFamilyAtom = useInitFamilyAtom(cardsFamilyAtom);
        const initOptionsFamilyAtom = useInitFamilyAtom(optionsFamilyAtom);

        getAllBooksFromAsyncDb(asyncMainDb).then((books) => {
                setBooksIds(pickIds(books));
                initBooksFamilyAtom(books);
        });

        getAllCardsFromAsyncDb(asyncMainDb).then((cards) => {
                initCardsFamilyAtom(cards);
        });

        getAllOptionsFromAsyncDb(asyncMainDb).then((options) => {
                initOptionsFamilyAtom(options);
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
