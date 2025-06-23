"use client";

import { userCollectionsAtom } from "@/app/lib/jotai/mainPage";
import { useAtomValue } from "jotai";

export default function RenderCollections() {
  const collections = useAtomValue(userCollectionsAtom);

  return (
    <div>
      {collections?.map(() => (
        <Collection />
      ))}
    </div>
  );
}

function Collection() {
  return <div>some collection</div>;
}
