import type { DBSchema } from "idb";
import type { CollectionResult } from "../AddCollectionPageDB/types";

export interface MainPageSchema extends DBSchema {
  userCollections: {
    key: string;
    value: CollectionResult;
  };
}

export type MyDB = GeneralDB<MainPageSchema>;
