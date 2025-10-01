'use client';
import { useEditBookProps } from '@/app/edit/page';
import { useMemo } from 'react';
import DescriptionInputUI from '@/src/components/edit_book_page/Description/UI';
import { getBookDescriptionAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';
import { useAtom } from 'jotai';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';

export default function BookDescriptionInput() {
        const { bookId } = useEditBookProps();
        const stableAdapterAtom = useMemo(
                () => getBookDescriptionAtomAdapter(bookId),
                []
        );
        const [value, setValue] = useAtom(stableAdapterAtom);

        const onChange = getInputChangeCallback((newVal) => setValue(newVal));

        return <DescriptionInputUI onChange={onChange} value={value} />;
}
