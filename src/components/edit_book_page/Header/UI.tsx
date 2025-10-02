import { ChangeEventHandler } from 'react';

export default function HeaderUI({
        defaultValue,
        onChange
}: {
        defaultValue: string;
        onChange: ChangeEventHandler;
}) {
        return (
                <header className='flex items-center justify-start gap-3'>
                        <h3 className='heading-1'>Edit book</h3>
                        <div className='heading-1 p-1 px-3 bg-gray-400 !text-gray-700 rounded-md'>
                                <span>'</span>
                                <input
                                        type='text'
                                        name='book-title'
                                        className='field-sizing-content'
                                        placeholder="Book's title"
                                        defaultValue={defaultValue}
                                        onChange={onChange}
                                />
                                <span>'</span>
                        </div>
                </header>
        );
}
