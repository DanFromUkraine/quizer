import { atom } from "jotai";
import { getAtomAddToArrayItem } from "./utils";
import { CollectionResult } from "../db/AddCollectionPageDB/types";

export const userCollectionsAtom = atom<CollectionResult[]>([]);

export const addCollectionAtom = getAtomAddToArrayItem(userCollectionsAtom);
