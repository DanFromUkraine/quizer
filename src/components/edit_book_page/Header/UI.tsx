import { ChangeEventHandler } from 'react';
import Quoted from '@/src/components/general/Quoted';

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
                        <Quoted variant="heading" className="!text-gray-700 heading-1 p-1 px-3 !w-fit">
                                <input
                                        type='text'
                                        name='book-title'
                                        className='field-sizing-content heading-1'
                                        placeholder="Book's title"
                                        defaultValue={defaultValue}
                                        onChange={onChange}
                                />
                        </Quoted>

                </header>
        );
}
