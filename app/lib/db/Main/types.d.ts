import type { DBSchema } from 'idb';
import type { CollectionResult } from '../ObservableCreateCollectionDB/types';
import { DB } from '@/app/lib/db/types';

export interface MainDbSchema extends DBSchema {
        userCollections: {
                key: string;
                value: CollectionResult;
        };
}

export type MainDB = DB<MainDbSchema>;
