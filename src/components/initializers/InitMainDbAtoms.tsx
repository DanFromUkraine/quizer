'use client';

import {
        getAllBooksFromAsyncDb,
        getAllExplicitCardsFromAsyncDb,
        getAllExplicitCardStoriesFromAsyncDb,
        getAllIsCorrectCardStoriesFromAsyncDb,
        getAllOptionsFromAsyncDb,
        getAllShortCardsFromAsyncDb,
        getAllStoriesFromAsyncDb,
        getAllTypeInCardStoriesFromAsyncDb,
        getMainDb
} from '@/src/utils/idb/main/actions';

import { useSetAtom } from 'jotai';
import { useInitAtomFamily } from '@/src/hooks/jotaiRelated/initializers';
import {
        booksAtomFamily,
        explicitCardsAtomFamily,
        explicitCardStoriesAtomFamily,
        isCorrectCardStoriesAtomFamily,
        isInitializationFromIdbCompletedAtom,
        mainDbAtom,
        optionsAtomFamily,
        shortCardsAtomFamily,
        storiesAtomFamily,
        typeInCardStoriesAtomFamily
} from '@/src/jotai/mainAtoms';
import { pickIds } from '@/src/utils/idb/idUtils';
import dynamic from 'next/dynamic';
import { booksIdsAtom, storyIdsAtom } from '@/src/jotai/idManagers';
import type {
        Book,
        ExplicitCard,
        MainDbGlobal,
        Option,
        TermDefinitionCard
} from '@/src/types/mainDbGlobal';
import { ObjWithId } from '@/src/types/globals';
import { memo } from 'react';
import {
        ExplicitCardStory,
        IsCorrectCardStory,
        Story,
        TypeInCardStory
} from '@/src/types/stories';

async function initEntity<T extends ObjWithId>({
        promise,
        setAll,
        setIds,
        initFamily
}: {
        promise: Promise<T[]>;
        setAll?: (items: T[]) => void;
        setIds?: (ids: string[]) => void;
        initFamily: (items: T[]) => void;
}) {
        return promise.then((items) => {
                if (setAll) setAll(items);
                if (setIds) setIds(pickIds(items));
                initFamily(items);
        });
}

async function useGetInitBooks(asyncMainDb: Promise<MainDbGlobal>) {
        const setBooksIds = useSetAtom(booksIdsAtom);
        const initBooksAtomFamily = useInitAtomFamily<Book>(booksAtomFamily);

        return initEntity({
                promise: getAllBooksFromAsyncDb(asyncMainDb),
                setIds: setBooksIds,
                initFamily: initBooksAtomFamily
        });
}

async function useGetInitExplicitCards(asyncMainDb: Promise<MainDbGlobal>) {
        const initExplicitCardsAtomFamily = useInitAtomFamily<ExplicitCard>(
                explicitCardsAtomFamily
        );

        return initEntity({
                promise: getAllExplicitCardsFromAsyncDb(asyncMainDb),
                initFamily: initExplicitCardsAtomFamily
        });
}

async function useGetInitOptions(asyncMainDb: Promise<MainDbGlobal>) {
        const initOptionsAtomFamily =
                useInitAtomFamily<Option>(optionsAtomFamily);

        return initEntity({
                promise: getAllOptionsFromAsyncDb(asyncMainDb),
                initFamily: initOptionsAtomFamily
        });
}

async function useGetInitShortCards(asyncMainDb: Promise<MainDbGlobal>) {
        const initShortCardsAtomFamily =
                useInitAtomFamily<TermDefinitionCard>(shortCardsAtomFamily);

        return initEntity({
                promise: getAllShortCardsFromAsyncDb(asyncMainDb),
                initFamily: initShortCardsAtomFamily
        });
}

async function useGetInitStories(asyncMainDb: Promise<MainDbGlobal>) {
        const setStoryIds = useSetAtom(storyIdsAtom);
        const initStoriesAtomFamily =
                useInitAtomFamily<Story>(storiesAtomFamily);

        return initEntity({
                promise: getAllStoriesFromAsyncDb(asyncMainDb),
                setIds: setStoryIds,
                initFamily: initStoriesAtomFamily
        });
}

async function useGetInitExplicitCardStories(
        asyncMainDb: Promise<MainDbGlobal>
) {
        const initExpCardStoriesAtomFamily =
                useInitAtomFamily<ExplicitCardStory>(
                        explicitCardStoriesAtomFamily
                );
        return initEntity({
                promise: getAllExplicitCardStoriesFromAsyncDb(asyncMainDb),
                initFamily: initExpCardStoriesAtomFamily
        });
}

async function useGetInitTypeInCardStories(asyncMainDb: Promise<MainDbGlobal>) {
        const initTypeInCardStoriesAtomFamily =
                useInitAtomFamily<TypeInCardStory>(typeInCardStoriesAtomFamily);

        return initEntity({
                promise: getAllTypeInCardStoriesFromAsyncDb(asyncMainDb),
                initFamily: initTypeInCardStoriesAtomFamily
        });
}

async function useGetInitIsCorrectCardStories(
        asyncMainDb: Promise<MainDbGlobal>
) {
        const initIsCorrectCardStoriesAtomFamily =
                useInitAtomFamily<IsCorrectCardStory>(
                        isCorrectCardStoriesAtomFamily
                );

        return initEntity({
                promise: getAllIsCorrectCardStoriesFromAsyncDb(asyncMainDb),
                initFamily: initIsCorrectCardStoriesAtomFamily
        });
}

export const InitAllMainDbAtoms_DO_NOT_IMPORT = memo(
        function InitAllMainDbAtoms_DO_NOT_IMPORT() {
                const asyncMainDb = getMainDb();
                const setMainDb = useSetAtom(mainDbAtom);
                const setIsInitCompleted = useSetAtom(
                        isInitializationFromIdbCompletedAtom
                );

                const p1 = useGetInitBooks(asyncMainDb);
                const p2 = useGetInitExplicitCards(asyncMainDb);
                const p3 = useGetInitOptions(asyncMainDb);
                const p4 = useGetInitShortCards(asyncMainDb);
                const p5 = useGetInitStories(asyncMainDb);
                const p6 = useGetInitExplicitCardStories(asyncMainDb);
                const p7 = useGetInitTypeInCardStories(asyncMainDb);
                const p8 = useGetInitIsCorrectCardStories(asyncMainDb);

                const mainDbPromise = asyncMainDb.then((db) => {
                        setMainDb(db);
                });

                void Promise.all([
                        p1,
                        p2,
                        p3,
                        p4,
                        p5,
                        p6,
                        p7,
                        p8,
                        mainDbPromise
                ]).then(() => {
                        setIsInitCompleted(true);
                });

                return <></>;
        }
);

export default dynamic(
        () =>
                import('@/src/components/initializers/InitMainDbAtoms').then(
                        (modules) => modules.InitAllMainDbAtoms_DO_NOT_IMPORT
                ),
        { ssr: false }
);
