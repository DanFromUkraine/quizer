"use client";

import { ReactNode, use } from "react";
import { createContextDefault, ProviderDB } from "../utils";
import { HistoryDBInterface } from "./types";
import { IDBPDatabase } from "idb";

const DBContext = createContextDefault<HistoryDBInterface>();

export default function HistoryDBContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const upgrade = (db: IDBPDatabase<HistoryDBInterface>) => {
    db.createObjectStore("completed");
    db.createObjectStore("incomplete");
  };

  return (
    <ProviderDB<HistoryDBInterface>
      {...{ ContextBody: DBContext, dbName: "history", upgrade }}
    >
      {children}
    </ProviderDB>
  );
}

export const useDB = () => use(DBContext);
