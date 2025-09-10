'use client';

import { memo, ReactNode } from 'react';
import {
        createObjectStoreEnhanced,
        getDB,
        ObservableProviderDB
} from '../utils';
import { DB_NAMES } from '@/app/lib/db/constants';
import { DB } from '@/app/lib/db/types';
import { MainDbSchema } from '@/app/lib/db/Main/types';
import { MainDbContext } from '@/app/lib/db/Main/context';

export const MainDbContextProvider = memo(function ({
        children
}: {
        children: ReactNode;
}) {
        const upgradeDatabase = (database: DB<MainDbSchema>) => {
                createObjectStoreEnhanced<MainDbSchema>({
                        keyPath: 'id',
                        db: database,
                        storeName: 'userCollections'
                });
        };

        const asyncDB = getDB({
                dbName: DB_NAMES.ADD_COLLECTION_PAGE,
                upgradeAction: upgradeDatabase
        });

        return (
                <ObservableProviderDB
                        Context={MainDbContext}
                        dbPromise={asyncDB}>
                        {children}
                </ObservableProviderDB>
        );
});
