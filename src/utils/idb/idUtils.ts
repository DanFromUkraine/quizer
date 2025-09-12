import { ObjWithId } from '@/src/types/globals';

export function pickIds<Item extends ObjWithId>(array: Item[]) {
        return array.map((item) => item.id);
}

export function getFilteredIds(array: string[], id: string) {
        return array.filter((prev) => prev !== id);
}
