"use client";

import { CollectionResult } from "@/app/lib/db/AddCollectionPageDB/types";
import { useInitCollections } from "@/app/lib/db/MainPageDB";
import { userCollectionsAtom } from "@/app/lib/jotai/mainPage";
import { useAtomValue } from "jotai";
import Collection from "./Collection";

export default function RenderCollections() {
  useInitCollections();
  const collections = useAtomValue(userCollectionsAtom);

  console.log({ collections });

  return (
    <div
      className="grid grid-cols-2 w-full h-fit gap-4 max-sm:grid-cols-1
    " 
    >
      {collections.map((collData) => (
        <Collection key={collData.id} {...collData} />
      ))}
    </div>
  );
}

// function Collection({ collectionTitle }: CollectionResult) {
//   return <div>some collection  {collectionTitle}</div>;
// }
