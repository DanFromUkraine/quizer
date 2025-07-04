"use client";

import { ReactNode, use } from "react";
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
    if (!database.objectStoreNames.contains("cards")) {
      database.createObjectStore("cards", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  };

  return (
    <ProviderDB<AddCollectionPageSchema>
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

export const useDB = () => use(DBContext);
