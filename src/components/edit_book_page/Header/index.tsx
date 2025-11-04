'use client';

import { useEditBookProps } from '@/app/edit/page';
import HeaderUI from '@/src/components/edit_book_page/Header/UI';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { getBookTitleFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';

export default function BookTitleInput() {
        const { bookId } = useEditBookProps();
        const stableAtom = useMemo(
                () => getBookTitleFamilyAdapterAtom(bookId),
                []
        );
        const [value, setValue] = useAtom(stableAtom);
        // const onChange = getInputChangeCallback(
        //         setValue as (s: string) => void
        // );

        return (
                <HeaderUI
                        value={value}
                        setValue={setValue as (s: string) => void}
                />
        );
}
