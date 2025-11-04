import { DB } from '@/src/types/globals';
import { StoreNames } from 'idb';

export function createObjectStoreEnhanced<DataType>({
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
