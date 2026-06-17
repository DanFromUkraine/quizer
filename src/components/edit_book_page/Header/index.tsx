'use client';

import { useEditBookProps } from '@/src/pages/edit/model/edit-book-props';
import HeaderUI from '@/src/components/edit_book_page/Header/UI';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { getBookTitleFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';

export default function BookTitleInput() {
    const { bookId } = useEditBookProps();
    const stableAtom = useMemo(() => getBookTitleFamilyAdapterAtom(bookId), []);
    const [value, setValue] = useAtom(stableAtom);

    return (
        <HeaderUI value={value} setValueAction={setValue as (s: string) => void} />
    );
}
