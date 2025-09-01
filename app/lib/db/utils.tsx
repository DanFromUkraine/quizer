"use client";

import { IDBPDatabase, openDB, StoreKey, StoreNames, StoreValue } from "idb";
import {
  Context,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Observable } from "../utils/observableLogic";
import { DB, ObservableDatabaseContext } from "./types";

export enum DB_NAMES {
  MAIN_PAGE = "MainPageDB",
  ADD_COLLECTION_PAGE = "AddCollectionPageDB",
}

export type GeneralDB<DataSchema> = IDBPDatabase<DataSchema>;

type DBContextShape<Schema extends {}> = {
  db: IDBPDatabase<Schema> | null;
};

export function createContextDefault<Schema extends {}>() {
  return createContext<DBContextShape<Schema>>({
    db: null as IDBPDatabase<Schema> | null,
  });
}

export async function getDB<DataSchema>({
  dbName,
  upgrade,
}: {
  dbName: string;
  upgrade: (database: GeneralDB<DataSchema>) => void;
}) {
  const db = openDB<DataSchema>(dbName, 1, {
    upgrade,
  });
  return db;
}

export function getUniqueID() {
  const currTime = Date.now();

  return `${currTime}-${crypto.randomUUID()}`;
}

export function createObjStoreDefault<DataType extends {}>(
  db: IDBPDatabase<DataType>,
  storeName: StoreNames<DataType>
) {
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, { keyPath: "id" });
  }
}

export async function getOrAndInit<
  DataSchema extends {},
  Store extends StoreNames<DataSchema>
>({
  db,
  storeName,
  key,
  initVal,
}: {
  db: IDBPDatabase<DataSchema>;
  storeName: Store;
  key: StoreKey<DataSchema, Store>;
  initVal: StoreValue<DataSchema, Store>;
}) {
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  const result = await store.get(key).then(async (val) => {
    if (typeof val === "undefined") {
      await store.add(initVal);
      return initVal;
    } else {
      return val;
    }
  });

  await transaction.done;

  return result;
}

export type DBContextGenType<DataSchema extends {}> = Context<{
  db: IDBPDatabase<DataSchema> | null;
}>;

export type DBContextExtendedType<DataSchema extends {}> = Context<{
  db: IDBPDatabase<DataSchema> | null;
}>;

type ProviderDbArgs<DataSchema extends {}> = {
  ContextBody: ReturnType<typeof createContextDefault<DataSchema>>;
  upgrade: (db: IDBPDatabase<DataSchema>) => void;
  children: ReactNode;
  dbName: string;
};

export function ProviderDB<DataSchema extends {}>(
  args: ProviderDbArgs<DataSchema>
): ReactNode;
export function ProviderDB<DataSchema extends {}, ForwardInfo>(
  args: ProviderDbArgs<DataSchema>
): ReactNode;

export function ProviderDB<DataSchema extends {}>({
  ContextBody,
  upgrade,
  children,
  dbName,
}: ProviderDbArgs<DataSchema>) {
  const [db, setDB] = useState<IDBPDatabase<DataSchema> | null>(null);

  const startNewDB = () => {
    getDB<DataSchema>({
      dbName: dbName,
      upgrade,
    }).then((res) => {
      setDB(res);
    });
  };

  useEffect(() => {
    if (!db) {
      startNewDB();
    }

    return () => {
      db?.close();
    };
  }, [db]);

  return (
    <ContextBody.Provider
      value={{
        db,
      }}
    >
      {children}
    </ContextBody.Provider>
  );
}

export function createObjectStoreEnhanced<DataType extends {}>({
  db,
  storeName,
  keyPath,
  autoIncrement,
}: {
  db: IDBPDatabase<DataType>;
  storeName: StoreNames<DataType>;
  keyPath: "id";
  autoIncrement?: true | undefined;
}) {
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, {
      keyPath,
      autoIncrement,
    });
  }
}

export function ObservableProviderDB<DataType extends {}>({
  Context,
  dbPromise,
  children,
}: {
  Context: ObservableDatabaseContext<DataType>;
  dbPromise: Promise<DB<DataType>>;
  children: ReactNode;
}) {
  const observable = useMemo(() => new Observable<DB<DataType>>(dbPromise), []);

  return <Context.Provider value={observable}>{children}</Context.Provider>;
}
