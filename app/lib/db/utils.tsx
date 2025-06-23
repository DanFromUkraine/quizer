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

export function createContextDefault<DBSchema extends {}>() {
  return createContext<{
    db: IDBPDatabase<DBSchema> | null;
    close: () => void;
    isDbNotReady: boolean;
  }>({
    db: null,
    close: () => {},
    isDbNotReady: true,
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
  return crypto.randomUUID();
}

export function createObjStoreDefault<DataType extends {}>(
  db: IDBPDatabase<DataType>,
  storeName: StoreNames<DataType>
) {
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, { keyPath: "id" });
  }
}

export function getIsDbUndefined<DB>(db: DB | undefined) {
  return typeof db === "undefined";
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

type DBContext<DBSchema extends {}> = Context<{
  db: IDBPDatabase<DBSchema> | null;
  close: () => void;
  isDbNotReady: boolean;
}>;

export function ProviderDB<DBSchema extends {}>({
  ContextBody,
  upgrade,
  children,
  dbName,
}: {
  ContextBody: DBContext<DBSchema>;
  upgrade: (db: IDBPDatabase<DBSchema>) => void;
  children: ReactNode;
  dbName: string;
}) {
  const dbIsClosed = useRef(false);
  const [db, setDB] = useState<IDBPDatabase<DBSchema> | null>(null);

  const close = () => {
    if (!dbIsClosed.current) {
      setDB(null);
      dbIsClosed.current = true;
      db?.close();
    } else {
      console.warn("DB is already closed");
    }
  };

  const resume = () => {
    dbIsClosed.current = false;
    getDB<DBSchema>({
      dbName: dbName,
      upgrade,
    }).then((res) => {
      setDB(res);
    });
  };

  useEffect(() => {
    if (!dbIsClosed.current) {
      resume();
    }
    return () => {
      db?.close();
    };
  }, []);

  const isDbNotReady = db === null || dbIsClosed.current;

  return (
    <ContextBody.Provider value={{ db, close, isDbNotReady }}>
      {children}
    </ContextBody.Provider>
  );
}
