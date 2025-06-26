import { atom, type PrimitiveAtom } from "jotai";

export function getAtomAddToArrayItem<Item, Arr extends Item[]>(
  targetAtom: PrimitiveAtom<Arr>
) {
  return atom(null, (_get, set, newItem: Item) => {
    set(targetAtom, (prev) => [...prev, newItem] as Arr);
  });
}


