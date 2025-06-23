"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { CollectionResult } from "./addCollectionPageDB";
import {
  createContextDefault,
  createObjStoreDefault,
  DB_NAMES,
  GeneralDB,
  getDB,
  getIsDbUndefined,
  ProviderDB,
} from "./utils";
import { DBSchema } from "idb";
import { useAtom, useSetAtom } from "jotai";
import { addCollectionAtom, userCollectionsAtom } from "../jotai/mainPage";
import { createContext } from "vm";

interface MainPageSchema extends DBSchema {
  userCollections: {
    key: "string";
    value: CollectionResult;
  };
}

type MyDB = GeneralDB<MainPageSchema>;

const DBContext = createContextDefault<MainPageSchema>();

export function MainPageDBContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const upgrade = (database: MyDB) => {
    createObjStoreDefault<MainPageSchema>(database, "userCollections");
  };

  return (
    <ProviderDB
      {...{ dbName: DB_NAMES.MAIN_PAGE, upgrade, ContextBody: DBContext }}
    >
      {children}
    </ProviderDB>
  );
}

const useDB = () => useContext(DBContext);

export function useAddCollection() {
  const { db } = useDB();
  // const addCollectionJotai = useSetAtom(addCollectionAtom);

  const addCollection = async (newCollection: CollectionResult) => {
    if (db === null) return;

    await db.put("userCollections", newCollection).then((resultString) => {
      console.log({ resultString });
    });
  };

  return { addCollection };
}

export function useInitCollections() {
  const { db } = useDB();
  const [_, setCollections] = useAtom(userCollectionsAtom);

  useEffect(() => {
    if (db === null) return;

    db.getAll("userCollections").then((collections) => {
      setCollections(collections);
    });
  });
}
