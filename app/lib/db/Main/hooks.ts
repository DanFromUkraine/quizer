'use client';

import { useAtom } from 'jotai';
import { CollectionResult } from '../ObservableCreateCollectionDB/types';
import { userCollectionsAtom } from '../../jotai/mainPage';
import { useEffect } from 'react';
import { useObservableContext } from '@/app/lib/db/Main/context';
import { Observable } from '@/app/lib/utils/observableLogic';
import { MainDB } from '@/app/lib/db/Main/types';

function addCollection(obs: Observable<MainDB> | null) {
        return (newCollection: CollectionResult) =>
                obs?.requestData('addCollection', async (db) => {
                        await db.put('userCollections', newCollection);
                });
}

export function useAddCollection() {
        const obs = useObservableContext();

        return addCollection(obs);
}

export function useInitCollections() {
        const obs = useObservableContext();
        const [_, setCollections] = useAtom(userCollectionsAtom);

        useEffect(() => {
                obs?.requestData('', (db) => {
                        db.getAll('userCollections').then((collections) => {
                                setCollections(collections);
                        });
                });
        }, []);
}
