// import { type MainDb } from '@/app/lib/types/mainDb';
// import { getCatchCallback } from '@/app/lib/utils/errorHandling/catchCallbackEnhanced';
// import { DB_NAMES } from '@/app/lib/constants/dbNames';
// import { UPGRADE_MAIN_DB } from '@/app/lib/constants/mainDb';
//
// export function getMainDb() {
//         return getDB({
//                 dbName: DB_NAMES.MAIN,
//                 upgradeAction: UPGRADE_MAIN_DB
//         }).catch(
//                 getCatchCallback(
//                         'Get Main db instance from IndexedDB wrapped with idb'
//                 )
//         );
// }
//
// export async function getAllBooks(mainDb: Promise<MainDb>) {
//         return (await mainDb)
//                 .getAll('books')
//                 .catch(
//                         getCatchCallback(
//                                 "Get all values from idb's books store"
//                         )
//                 );
// }
//
// export function getAllBooksSync(mainDb: MainDb) {
//         return mainDb
//                 .getAll('books')
//                 .catch(
//                         getCatchCallback(
//                                 "Get all values from idb's books store"
//                         )
//                 );
// }
//
// export async function getAllCards(mainDb: Promise<MainDb>) {
//         return (await mainDb)
//                 .getAll('cards')
//                 .catch(
//                         getCatchCallback(
//                                 "Get all values from idb's cards store"
//                         )
//                 );
// }
//
// export async function getAllOptions(mainDb: Promise<MainDb>) {
//         return (await mainDb)
//                 .getAll('options')
//                 .catch(
//                         getCatchCallback(
//                                 "Get all values from idb's options store"
//                         )
//                 );
// }
//
// export async function getAllBooksIds(mainDb: Promise<MainDb>) {
//         return getAllBooks(mainDb).then((books) =>
//                 books.map((book) => book.id)
//         );
// }
