"use client";

import { ReactNode, use } from "react";
import { createContextDefault, ProviderDB } from "../utils";
import { HistoryDBInterface } from "./types";

const DBContext = createContextDefault<HistoryDBInterface>();

export default function HistoryDbContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const upgrade = () => {
    
  };

  return (
    <ProviderDB<HistoryDBInterface>
      {...{ ContextBody: DBContext, dbName: "history", upgrade }}
    >
      {children}
    </ProviderDB>
  );
}

const useDB = use(DBContext);
