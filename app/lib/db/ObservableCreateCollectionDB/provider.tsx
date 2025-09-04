'use client';

import { memo, ReactNode } from 'react';
import {
        createObjectStoreEnhanced,
        DB_NAMES,
        getDB,
        ObservableProviderDB
} from '../utils';
import { AddCollectionPageSchema, CreateCollectionDB } from './types';
// import { Observable } from "../../utils/observableLogic";
// import { IDBPDatabase } from "idb";
import { ObservableCreateCollectionDBContext } from './context';

// const DBContext = createContextDefault<AddCollectionPageSchema>();

// export function AddCollectionPageDBContextProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const upgrade = (database: MyDB) => {
//     createObjStoreDefault<AddCollectionPageSchema>(database, "meta");
//     if (!database.objectStoreNames.contains("cards")) {
//       database.createObjectStore("cards", {
//         keyPath: "id",
//         autoIncrement: true,
//       });
//     }
//   };

//   return (
//     <ProviderDB<AddCollectionPageSchema>
//       {...{
//         dbName: DB_NAMES.ADD_COLLECTION_PAGE,
//         upgrade,
//         ContextBody: DBContext,
//       }}
//     >
//       {children}
//     </ProviderDB>
//   );
// }

// export const useDB = () => use(DBContext);

export const ObservableCreateCollectioProviderDB = memo(function ({
        children
}: {
        children: ReactNode;
}) {
        const upgradeDatabase = (database: CreateCollectionDB) => {
                createObjectStoreEnhanced<AddCollectionPageSchema>({
                        keyPath: 'id',
                        db: database,
                        storeName: 'meta'
                });
                createObjectStoreEnhanced<AddCollectionPageSchema>({
                        keyPath: 'id',
                        db: database,
                        storeName: 'cards',
                        autoIncrement: true
                });
        };

        const asyncDB = getDB({
                dbName: DB_NAMES.ADD_COLLECTION_PAGE,
                upgrade: upgradeDatabase
        });

        return (
                <ObservableProviderDB
                        Context={ObservableCreateCollectionDBContext}
                        dbPromise={asyncDB}>
                        {children}
                </ObservableProviderDB>
        );
});
