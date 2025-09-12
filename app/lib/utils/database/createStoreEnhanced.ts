// import { DB } from '@/app/lib/db/types';
// import { StoreNames } from 'idb';
//
// export function createObjectStoreEnhanced<DataType extends {}>({
//         db,
//         storeName,
//         keyPath,
//         autoIncrement
// }: {
//         db: DB<DataType>;
//         storeName: StoreNames<DataType>;
//         keyPath: 'id';
//         autoIncrement?: true | undefined;
// }) {
//         if (!db.objectStoreNames.contains(storeName)) {
//                 db.createObjectStore(storeName, {
//                         keyPath,
//                         autoIncrement
//                 });
//         }
// }
