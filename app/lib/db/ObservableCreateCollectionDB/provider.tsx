// 'use client';
//
// import { memo, ReactNode } from 'react';
// import {
//         createObjectStoreEnhanced,
//         getDB,
//         ObservableProviderDB
// } from '../utils';
// import { CollectionDbSchema, CreateCollectionDB } from './types';
// import { DB_NAMES } from '@/app/lib/db/constants';
//
// export const CreateCollectionProviderDB = memo(function ({
//         children
// }: {
//         children: ReactNode;
// }) {
//         const upgradeDatabase = (database: CreateCollectionDB) => {
//                 createObjectStoreEnhanced<CollectionDbSchema>({
//                         keyPath: 'id',
//                         db: database,
//                         storeName: 'meta'
//                 });
//                 createObjectStoreEnhanced<CollectionDbSchema>({
//                         keyPath: 'id',
//                         db: database,
//                         storeName: 'cards',
//                         autoIncrement: true
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
//                         Context={CreateCollectionProviderDB}
//                         dbPromise={asyncDB}>
//                         {children}
//                 </ObservableProviderDB>
//         );
// });
