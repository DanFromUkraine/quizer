import { MainDb, MainDbSchema } from '@/src/types/mainDb';
import { createObjectStoreEnhanced } from '@/src/utils/idb/createStoreEnhanced';

export const UPGRADE_MAIN_DB = (database: MainDb) => {
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'books',
                keyPath: 'id'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'cards',
                keyPath: 'id'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'options',
                keyPath: 'id'
        });
};
