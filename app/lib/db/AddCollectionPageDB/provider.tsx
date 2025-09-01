"use client";

import { createContext, memo, ReactNode, use, useMemo } from "react";
import {
  createContextDefault,
  createObjStoreDefault,
  DB_NAMES,
  ProviderDB,
} from "../utils";
import { AddCollectionPageSchema, MyDB } from "./types";
import { Observable } from "../../utils/observableLogic";

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

// const MyContext = createContext<Observable<string> | null>(null);

// export const AddCollectionDBObservableProvider = memo(function ObservableSome({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const upgrade = (database: MyDB) => {
//     createObjStoreDefault<AddCollectionPageSchema>(database, "meta");
//     if (!database.objectStoreNames.contains("cards")) {
//       database.createObjectStore("cards", {
//         keyPath: "id",
//         autoIncrement: true,
//       });
//     }
//   };

//   const obs = useMemo(() => new Observable<string>(), []);

//   return <MyContext.Provider value={obs}>{children}</MyContext.Provider>;
// });


// export function ObservableProviderDB({

// }: {
  
// }) {

// }