"use client";

import { IDBPDatabase, openDB, StoreKey, StoreNames, StoreValue } from "idb";
import { Context, createContext, ReactNode, useEffect, useState } from "react";

export enum DB_NAMES {
  MAIN_PAGE = "MainPageDB",
  ADD_COLLECTION_PAGE = "AddCollectionPageDB",
}

export type GeneralDB<DataSchema> = IDBPDatabase<DataSchema>;

type DBContextShape<Schema extends {}, ForwardInfo> = {
  db: IDBPDatabase<Schema> | null;
  forwardInfo: ForwardInfo | undefined;
};

export function createContextDefault<Schema extends {}, ForwardInfo>() {
  return createContext<DBContextShape<Schema, ForwardInfo>>({
    db: null as IDBPDatabase<Schema> | null,
    forwardInfo: null as ForwardInfo,
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

export type DBContextExtendedType<
  DataSchema extends {},
  ForwardInfo = undefined
> = Context<{
  db: IDBPDatabase<DataSchema> | null;
  forwardInfo: ForwardInfo;
}>;

type ProviderDbArgs<DataSchema extends {}, ForwardInfo = undefined> = {
  ContextBody: ReturnType<typeof createContextDefault<DataSchema, ForwardInfo>>;
  upgrade: (db: IDBPDatabase<DataSchema>) => void;
  children: ReactNode;
  dbName: string;
  forwardInfo?: ForwardInfo;
};

export function ProviderDB<DataSchema extends {}>(
  args: ProviderDbArgs<DataSchema>
): ReactNode;
export function ProviderDB<DataSchema extends {}, ForwardInfo>({
  forwardInfo,
  ...args
}: ProviderDbArgs<DataSchema, ForwardInfo> & {
  forwardInfo: ForwardInfo;
}): ReactNode;

export function ProviderDB<DataSchema extends {}, ForwardInfo = undefined>({
  ContextBody,
  upgrade,
  children,
  dbName,
  forwardInfo,
}: ProviderDbArgs<DataSchema, ForwardInfo>) {
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
        forwardInfo: forwardInfo,
      }}
    >
      {children}
    </ContextBody.Provider>
  );
}
