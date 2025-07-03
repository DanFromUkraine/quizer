import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type OneCollectionType = {
  _id: string;
  _rev: string;
  collectionTitle: string;
};

type CollectionsType = {
  collections: OneCollectionType[];
};

type DB = PouchDB.Database<CollectionsType> | undefined;

type SetCollections = Dispatch<SetStateAction<OneCollectionType[] | undefined>>;

const db = new PouchDB<CollectionsType>("main-page");

export function useGetCollections() {
  const [collections, setCollections] = useState<OneCollectionType[]>();

  useEffect(() => initCollectionsState({ setCollections, db }), [db]);

  return collections;
}

function initCollectionsState({
  setCollections,
  db,
}: {
  setCollections: SetCollections;
  db: DB;
}) {
  db?.get("collections").then(({ collections }) => {
    setCollections(collections);
  });
}
