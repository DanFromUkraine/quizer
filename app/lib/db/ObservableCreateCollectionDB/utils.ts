'use client';

import { deleteDB } from 'idb';
import { CreateCollectionDB } from '@/app/lib/db/ObservableCreateCollectionDB/types';
import { DB_NAMES } from '@/app/lib/db/constants';
import { SetState } from '@/app/lib/types/global';
import { useObservableContext } from '@/app/lib/db/ObservableCreateCollectionDB/context';

import { useEffect } from 'react';
import { getOrAndInit } from '@/app/lib/db/utils';

export async function deleteThisDB(db: CreateCollectionDB) {
        db.close();
        await deleteDB(DB_NAMES.ADD_COLLECTION_PAGE, {
                blocked(version, event) {
                        console.log('blocked', { version, event });
                }
        });
        return;
}

export function useInitCollectionTitle({
        setDefaultCollectionTitle,
        setLoading
}: {
        setDefaultCollectionTitle: SetState<string>;
        setLoading: SetState<boolean>;
}) {
        const obs = useObservableContext();

        useEffect(() => {
                obs?.requestData('initialize page title', (db) => {
                        getOrAndInit({
                                db,
                                storeName: 'meta',
                                key: 'collectionTitle',
                                initVal: { id: 'collectionTitle', value: '' }
                        }).then((result) => {
                                if ('value' in result) {
                                        setDefaultCollectionTitle(result.value);
                                        setLoading(false);
                                }
                        });
                });
        }, []);
}
