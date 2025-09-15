import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import useJotaiDeferredInput from '@/src/hooks/jotai/jotaiDeferedInput';
import { useEditBookProps } from '@/app/books/edit/page';
import { bookDescriptionAtomAdapter } from '@/src/jotai/mainDbAtom';
import { ChangeEventHandler } from 'react';

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

        return (
                <section className='container'>
                        <label htmlFor='book-description'>
                                <h2 className='heading-2'>
                                        How can you describe this book?
                                </h2>
                        </label>

                        <ExtendableTextArea
                                className='p-2 pt-3 px-3 bg-gray-300 rounded-md  focus-visible:outline-none'
                                name='book-description'
                                id='book-description'
                                placeholder='some description yata-yata'
                                defaultValue={value}
                                onChange={onChange}
                        />
                </section>
        );
}

/*


df
 */
