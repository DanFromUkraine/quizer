"use client";

import { IDBPDatabase, openDB, StoreKey, StoreNames, StoreValue } from "idb";
import {
  Context,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export enum DB_NAMES {
  MAIN_PAGE = "MainPageDB",
  ADD_COLLECTION_PAGE = "AddCollectionPageDB",
}

export type GeneralDB<DataSchema> = IDBPDatabase<DataSchema>;

export function createContextDefault<
  Schema extends {}
>(): DBContextType<Schema> {
  return createContext({
    db: null as IDBPDatabase<Schema> | null,
    close: () => {},
    isDbClosed: true as boolean,
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

export type DBContextType<DBSchema extends {}> = Context<{
  db: IDBPDatabase<DBSchema> | null;
}>;

function useFlushManager() {
  const flushFns = useRef<FlushDebounceType[]>([]);

  const finishAll = () => {
    flushFns.current.forEach(({ flush }) => flush());
    flushFns.current = [];
  };

  const onAddFlush = (newFlush: FlushDebounceType) => {
    flushFns.current.push(newFlush);
  };

  const onRemoveFlush = (deleteID: string) => {
    flushFns.current = flushFns.current.filter(({ id }) => id !== deleteID);
  };

  return {
    finishAll,
    onAddFlush,
    onRemoveFlush,
  };
}

type FlushDebounceType = {
  id: string;
  flush: () => void;
};

export function ProviderDB<DBSchema extends {}>({
  ContextBody,
  upgrade,
  children,
  dbName,
}: {
  ContextBody: DBContextType<DBSchema>;
  upgrade: (db: IDBPDatabase<DBSchema>) => void;
  children: ReactNode;
  dbName: string;
}) {
  const [db, setDB] = useState<IDBPDatabase<DBSchema> | null>(null);

  const startNewDB = () => {
    getDB<DBSchema>({
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
