import { ObjWithId } from '@/app/lib/types/global';

export function pickIds<Item extends ObjWithId>(array: Item[]) {
        return array.map((item) => item.id);
}
