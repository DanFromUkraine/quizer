"use client";

import { IDBPDatabase } from "idb";
import { ReactNode, use } from "react";
import { createContextDefault, ProviderDB } from "../utils";
import { HistoryDBInterface } from "./types";
type HistoryForwardInfo = {
  collectionID: string;
};

const DBContext = createContextDefault<HistoryDBInterface>();

export default function HistoryDBContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const upgrade = (db: IDBPDatabase<HistoryDBInterface>) => {
    if (!db.objectStoreNames.contains("complete")) {
      db.createObjectStore("complete", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("incomplete")) {
      db.createObjectStore("incomplete", { keyPath: "id" });
    }
  };

  return (
    <ProviderDB<HistoryDBInterface, HistoryForwardInfo>
      {...{
        ContextBody: DBContext,
        dbName: "history",
        upgrade,
      }}
    >
      {children}
    </ProviderDB>
  );
}

export const useDB = () => use(DBContext);
