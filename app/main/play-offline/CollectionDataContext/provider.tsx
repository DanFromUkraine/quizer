"use client";

import { ReactNode } from "react";
import { useGetCollection } from "../../../lib/db/History";
import { CollectionContextIncomplete } from "./context";

export default function CollectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { collection } = useGetCollection();

  return (
    <CollectionContextIncomplete.Provider value={collection}>
      {children}
    </CollectionContextIncomplete.Provider>
  );
}
