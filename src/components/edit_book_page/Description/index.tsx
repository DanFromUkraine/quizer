'use client';
import { useEditBookProps } from '@/app/edit/page';
import { useMemo } from 'react';
import DescriptionInputUI from '@/src/components/edit_book_page/Description/UI';
import { getBookDescriptionFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { useAtom } from 'jotai';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export default function BookDescriptionInput() {
        const { bookId } = useEditBookProps();
        const stableAdapterAtom = useMemo(
                () => getBookDescriptionFamilyAdapterAtom(bookId),
                []
        );
        const [value, setValue] = useAtom(stableAdapterAtom);

        const onChange = getInputChangeCallback(
                setValue as (s: string) => void
        );

        return <DescriptionInputUI onChange={onChange} value={value} />;
}
