export interface MainPageSchema extends DBSchema {
  userCollections: {
    key: "string";
    value: CollectionResult;
  };
}

export type MyDB = GeneralDB<MainPageSchema>;