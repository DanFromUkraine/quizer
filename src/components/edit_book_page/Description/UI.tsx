import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';

export default function DescriptionInputUI({
        value,
        onChange
}: {
        value: string;
        onChange: ChangeEventHandler;
}) {
        return (
                <section className='container'>
                        <label htmlFor='book-description'>
                                <h2 className='heading-2'>
                                        How can you describe this book?
                                </h2>
                        </label>

                        <ExtendableTextArea
                                className='p-2 pt-3 px-3 bg-gray-300 rounded-md  focus-visible:outline-none field-sizing-content'
                                name='book-description'
                                id='book-description'
                                placeholder='some description yata-yata'
                                defaultValue={value}
                                onChange={onChange}
                        />
                </section>
        );
}
