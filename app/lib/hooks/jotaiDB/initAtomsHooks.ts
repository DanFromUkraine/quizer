'use client';
import {
        booksFamilyAtom,
        cardsFamilyAtom,
        mainDbAtom,
        optionFamilyAtom
} from '@/app/lib/jotai/MainDbAtom';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useEffect } from 'react';
import { Book, Card, MainDb, Option } from '@/app/lib/types/mainDb';
import { PrimitiveAtom } from 'jotai';
import {
        getAllBooks,
        getAllCards,
        getAllOptions
} from '@/app/lib/utils/database/mainDbGetters';
import { ObjWithId } from '@/app/lib/types/global';

type AsyncDataGetter<T> = (asyncDb: Promise<MainDb>) => Promise<T>;
type FamilyAtom<T> = (id: string) => PrimitiveAtom<T>;


function useInitAtomFamilyWithData<DataType extends ObjWithId>(
        asyncGetter: AsyncDataGetter<DataType[]>,
        atomFamily: FamilyAtom<DataType>
) {


        const callback = useAtomCallback(
                useCallback(async (get, set) => {
                        const mainDb = get(mainDbAtom);
                        if (typeof mainDb === 'undefined') return;
                        const items = await asyncGetter(mainDb);
                        items.forEach((item) => set(atomFamily(item.id), item));
                }, [])
        );
        useEffect(() => {
                callback();
        }, []);
}

export function useInitAllAtomFamilies() {
        useInitAtomFamilyWithData<Book>(getAllBooks, booksFamilyAtom);
        useInitAtomFamilyWithData<Card>(getAllCards, cardsFamilyAtom);
        useInitAtomFamilyWithData<Option>(getAllOptions, optionFamilyAtom);
}
