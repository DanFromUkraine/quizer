import { AtomFamily } from '@/src/types/jotaiGlobal';
import { StoreMap } from '@/src/types/mainDbGlobal';
import { type WritableAtom } from 'jotai';


export type FatherFamilyAtom = AtomFamily<
        string,
        WritableAtom<
                StoreMap['explicitCards' | 'books'],
                [StoreMap['explicitCards' | 'books']],
                unknown
        >
>;

export type WithIdAndChildrenId = {
        id: string;
        childrenIds: string[];
};

export type FatherUpdateActionAtom = WritableAtom<
        null,
        [WithIdAndChildrenId],
        Promise<void>
>;

export interface SetterAtomForViaTextProps<Item> {
        fatherId: string;
        items: Item[];
        fatherFamily: FatherFamilyAtom;
}

export interface SetterAtomForUpdateViaTextProps<Item>
        extends SetterAtomForViaTextProps<Item> {
        updateActionAtom: WritableAtom<
                null,
                [item: Item, itemId: string],
                Promise<void>
        >;
}

export interface SetterAtomForDeleteViaTextProps<Item>
        extends SetterAtomForViaTextProps<Item> {
        deleteActionAtom: WritableAtom<
                null,
                [itemIdToDelete: string],
                Promise<void>
        >;
}

export type InsertActionAtom<Item> = WritableAtom<
        null,
        [newItemData: Item & { id: string }],
        Promise<void>
>;

export interface SetterAtomForInsertionViaTextProps<Item>
        extends SetterAtomForViaTextProps<Item> {
        insertActionAtom: InsertActionAtom<Item>;
}
