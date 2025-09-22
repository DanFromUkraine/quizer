import { MainDbGlobal, MainDbSchema } from '@/src/types/mainDbGlobal';
import { createObjectStoreEnhanced } from '@/src/utils/idb/createStoreEnhanced';

export const UPGRADE_MAIN_DB = (database: MainDbGlobal) => {
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
