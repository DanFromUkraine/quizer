"use client";

import { CollectionResult } from "@/app/lib/db/AddCollectionPageDB/types";
import { useGetCollection } from "@/app/lib/db/MainPageDB";
import { createContext, ReactNode } from "react";

export const collectionContext = createContext<CollectionResult | undefined>(
  undefined
);

export default function CollectionContextProvider({
  children,
  collectionID,
}: {
  children: ReactNode;
  collectionID: string;
}) {
  const collection = useGetCollection(collectionID);

  return (
    <collectionContext.Provider value={collection}>
      {children}
    </collectionContext.Provider>
  );
}
