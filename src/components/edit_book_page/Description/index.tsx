import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { useEditBookProps } from '@/app/books/edit/page';
import { bookDescriptionAtomAdapter } from '@/src/jotai/mainDbAtom';
import { ChangeEventHandler } from 'react';
import DescriptionInputUI from '@/src/components/edit_book_page/Description/UI';

export default function BookDescriptionInput() {
        const { bookId } = useEditBookProps();
        const [value, setValue] = useJotaiDeferredInput(
                bookDescriptionAtomAdapter,
                bookId
        );

        const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
                const value = e.target.value;
                if (typeof value !== 'string') return;
                setValue(value);
        };

        return <DescriptionInputUI onChange={onChange} defaultValue={value} />;
}
