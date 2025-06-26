"use client"

import { ReactNode, useContext } from "react";
import {
  createContextDefault,
  createObjStoreDefault,
  DB_NAMES,
  DBContextType,
  ProviderDB,
} from "../utils";
import { AddCollectionPageSchema, MyDB } from "./types";

const DBContext: DBContextType<AddCollectionPageSchema> =
  createContextDefault<AddCollectionPageSchema>();

export function AddCollectionPageDBContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const upgrade = (database: MyDB) => {
    createObjStoreDefault<AddCollectionPageSchema>(database, "meta");
    createObjStoreDefault<AddCollectionPageSchema>(database, "cards");
  };

  return (
    <ProviderDB
      {...{
        dbName: DB_NAMES.ADD_COLLECTION_PAGE,
        upgrade,
        ContextBody: DBContext,
      }}
    >
      {children}
    </ProviderDB>
  );
}

export const useDB = () => useContext(DBContext);
