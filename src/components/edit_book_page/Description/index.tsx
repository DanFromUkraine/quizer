import useJotaiDeferredInput from '@/src/hooks/jotaiRelated/jotaiDeferedInput';
import { useEditBookProps } from '@/app/edit/page';
import { ChangeEventHandler } from 'react';
import DescriptionInputUI from '@/src/components/edit_book_page/Description/UI';
import { bookDescriptionAtomAdapter } from '@/src/utils/jotai/mainDbAtomAdapters';

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
