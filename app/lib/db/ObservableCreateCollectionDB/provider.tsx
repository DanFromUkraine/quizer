"use client";

import { Context, createContext, memo, ReactNode, use, useMemo } from "react";
import {
  createContextDefault,
  createObjectStoreEnhanced,
  createObjStoreDefault,
  DB_NAMES,
  getDB,
  ProviderDB,
} from "../utils";
import { AddCollectionPageSchema, MyDB } from "./types";
import { Observable } from "../../utils/observableLogic";
import { IDBPDatabase } from "idb";

const DBContext = createContextDefault<AddCollectionPageSchema>();

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

type CreateCollectionDB = IDBPDatabase<AddCollectionPageSchema>;
type ObservableCreateCollectionContext =
  Context<Observable<CreateCollectionDB> | null>;

export const ObservableCreateCollectionDBContext =
  createContext<Observable<CreateCollectionDB> | null>(null);

export const ObservableCreateCollectioProviderDB = memo(function ({
  children,
}: {
  children: ReactNode;
}) {
  const upgradeDatabase = (database: CreateCollectionDB) => {
    createObjectStoreEnhanced<AddCollectionPageSchema>({
      keyPath: "id",
      db: database,
      storeName: "meta",
    });
    createObjectStoreEnhanced<AddCollectionPageSchema>({
      keyPath: "id",
      db: database,
      storeName: "cards",
      autoIncrement: true,
    });
  };

  const asyncDB = getDB({
    dbName: DB_NAMES.ADD_COLLECTION_PAGE,
    upgrade: upgradeDatabase,
  });

  return (
    <ObservableProviderDB
      Context={ObservableCreateCollectionDBContext}
      dbPromise={asyncDB}
    >
      {children}
    </ObservableProviderDB>
  );
});

export function ObservableProviderDB({
  Context,
  dbPromise,
  children,
}: {
  Context: ObservableCreateCollectionContext;
  dbPromise: Promise<CreateCollectionDB>;
  children: ReactNode;
}) {
  const observable = useMemo(
    () => new Observable<CreateCollectionDB>(dbPromise),
    []
  );

  return <Context.Provider value={observable}>{children}</Context.Provider>;
}
