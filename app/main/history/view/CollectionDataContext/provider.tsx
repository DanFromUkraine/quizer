"use client";

import { ReactNode } from "react";
import { CollectionContextComplete } from "./context";
import { useGetResultInfo } from "@/app/lib/db/History";

export default function CollectionDataCompleteContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const collectionData = useGetResultInfo();

  return (
    <CollectionContextComplete.Provider value={collectionData}>
      {children}
    </CollectionContextComplete.Provider>
  );
}
