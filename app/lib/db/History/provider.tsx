// 'use client';
//
// import { memo, ReactNode } from 'react';
// import {
//         createObjectStoreEnhanced,
//         getDB,
//         ObservableProviderDB
// } from '../utils';
// import { DB_NAMES } from '@/app/lib/db/constants';
// import { HistoryDB, HistoryDbContext } from '@/app/lib/db/History/context';
// import { HistoryDBInterface } from '@/app/lib/db/History/types';
//
// export const HistoryDbContextProvider = memo(function ({
//         children
// }: {
//         children: ReactNode;
// }) {
//         const upgradeDatabase = (database: HistoryDB) => {
//                 createObjectStoreEnhanced<HistoryDBInterface>({
//                         keyPath: 'id',
//                         db: database,
//                         storeName: 'complete'
//                 });
//                 createObjectStoreEnhanced<HistoryDBInterface>({
//                         keyPath: 'id',
//                         db: database,
//                         storeName: 'incomplete'
//                 });
//         };
//
//         const asyncDB = getDB({
//                 dbName: DB_NAMES.ADD_COLLECTION_PAGE,
//                 upgradeAction: upgradeDatabase
//         });
//
//         return (
//                 <ObservableProviderDB
//                         Context={HistoryDbContext}
//                         dbPromise={asyncDB}>
//                         {children}
//                 </ObservableProviderDB>
//         );
// });
