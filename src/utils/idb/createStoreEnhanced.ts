import { StoreNames } from 'idb';
import { DB } from '@/src/types/globals';

export function createObjectStoreEnhanced<DataType extends {}>({
        db,
        storeName,

        autoIncrement
}: {
        db: DB<DataType>;
        storeName: StoreNames<DataType>;
        autoIncrement?: true | undefined;
}) {
        if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, {
                        keyPath: 'id',
                        autoIncrement
                });
        }
}
