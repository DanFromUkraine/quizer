import { atom } from "jotai";
import { CollectionResult } from "../db/addCollectionPageDB";
import { getAtomAddToArrayItem } from "./utils";

export const userCollectionsAtom = atom<CollectionResult[]>([]);

export const addCollectionAtom = getAtomAddToArrayItem(userCollectionsAtom);
