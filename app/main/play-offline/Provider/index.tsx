"use client";

import { useGetCollection } from "@/app/lib/db/History";
import { CollectionStoryIncomplete } from "@/app/lib/db/History/types";
import { createContext, ReactNode, use } from "react";

const CollectionContext = createContext<CollectionStoryIncomplete | null>(null);

export default function CollectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { collection } = useGetCollection();

  console.log({ collectionInProvider: collection });

  return (
    <CollectionContext.Provider value={collection}>
      {children}
    </CollectionContext.Provider>
  );
}

export const useCollectionContext = () => use(CollectionContext);
