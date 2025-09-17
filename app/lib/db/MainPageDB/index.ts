'use client';

import { useAtom } from 'jotai';
import { CollectionResult } from '../ObservableCreateCollectionDB/types';
import { userCollectionsAtom } from '../../jotai/mainPage';
import { useEffect, useState } from 'react';
import { useDB } from './provider';

export function useAddCollection() {
        const { db } = useDB();

        const addCollection = async (newCollection: CollectionResult) => {
                if (db === null) return;

                await db.put('userCollections', newCollection);
        };

        return { addCollection };
}

export function useInitCollections() {
        const { db } = useDB();
        const [_, setCollections] = useAtom(userCollectionsAtom);

        useEffect(() => {
                if (db === null) return;

                db.getAll('userCollections').then((collections) => {
                        setCollections(collections);
                });
        }, [db]);
}

export function useGetCollection(collectionID: string) {
        const { db } = useDB();
        const [collection, setCollection] = useState<CollectionResult>();

        useEffect(() => {
                if (db === null) return;

                db.get('userCollections', collectionID).then((res) => {
                        setCollection(res);
                });
        }, [db]);

        return collection;
}
