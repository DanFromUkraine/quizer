import { MainDbGlobal, MainDbSchema } from '@/src/types/mainDbGlobal';
import { createObjectStoreEnhanced } from '@/src/utils/idb/createStoreEnhanced';

export const UPGRADE_MAIN_DB = (database: MainDbGlobal) => {
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'books'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'cards'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'options'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'history'
        });
};
