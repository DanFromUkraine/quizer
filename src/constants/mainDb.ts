import type { MainDbGlobal, MainDbSchema } from '@/src/types/mainDbGlobal';
import { createObjectStoreEnhanced } from '@/src/utils/idb/createStoreEnhanced';

export const UPGRADE_MAIN_DB = (database: MainDbGlobal) => {
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'books'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'explicitCards'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'shortCards'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'options'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'stories'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'explicitCardStories'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'typeInCardStories'
        });
        createObjectStoreEnhanced<MainDbSchema>({
                db: database,
                storeName: 'isCorrectCardStories'
        });
};
