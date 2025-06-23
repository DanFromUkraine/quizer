"use client";

import CollectionTitle from "./CollectionTitle";
import SaveBtn from "./SaveCollectionBtn";

export default function Header() {
  return (
    <header className="w-full flex justify-between">
      <CollectionTitle />
      <SaveBtn />
    </header>
  );
}
