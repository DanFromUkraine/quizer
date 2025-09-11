'use client';

//#task: db must close connection on unmount

import {
        getAllBooksSync,
        getMainDb
} from '@/app/lib/utils/database/mainDbGetters';
import { booksIdsAtom, mainDbAtom } from '@/app/lib/jotai/MainDbAtom';
import { useSetAtom } from 'jotai';
import { pickIds } from '@/app/lib/utils/database/pickIds';

export default function InitAllMainDbAtoms_CLIENT_ONLY() {
        const asyncMainDb = getMainDb();
        const setMainDb = useSetAtom(mainDbAtom);
        const setBooksIds = useSetAtom(booksIdsAtom);

        asyncMainDb.then((db) => {
                setMainDb(db);
                getAllBooksSync(db)
                        .then((books) => pickIds(books))
                        .then((ids) => setBooksIds(ids));
        });

        // useInitAllAtomFamilies();

        return <></>;
}
