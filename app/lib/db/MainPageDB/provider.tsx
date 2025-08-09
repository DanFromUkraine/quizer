"use client";

import { ReactNode, useContext } from "react";
import {
  createContextDefault,
  createObjStoreDefault,
  DB_NAMES,
  ProviderDB,
} from "../utils";
import { MainPageSchema, MyDB } from "./types";

const DBContext = createContextDefault<MainPageSchema, undefined>();

export default function MainPageDBContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const upgrade = (database: MyDB) => {
    createObjStoreDefault<MainPageSchema>(database, "userCollections");
  };

  return (
    <ProviderDB<MainPageSchema>
      {...{ dbName: DB_NAMES.MAIN_PAGE, upgrade, ContextBody: DBContext }}
    >
      {children}
    </ProviderDB>
  );
}

export const useDB = () => useContext(DBContext);
