import { ChangeEventHandler } from 'react';
import Quoted from '@/src/components/general/Quoted';

export default function HeaderUI({
        value,
        onChange
}: {
        value: string;
        onChange: ChangeEventHandler;
}) {
        return (
                <header className='flex items-center justify-start gap-3 max-[412px]:flex-col max-[412px]:items-start'>
                        <h3 className='heading-1'>Edit book</h3>
                        <Quoted variant="large-heading" className="!text-gray-700 heading-1 p-1 px-3 !w-fit max-[412px]:max-w-[calc(100vw-30px)]">
                                <input
                                        type='text'
                                        name='book-title'
                                        className='field-sizing-content heading-1 !text-gray-700 !mb-0 max-[412px]:w-full max-[412px]:field-sizing-fixed'
                                        placeholder="Book's title"
                                        value={value}
                                        onChange={onChange}
                                />
                        </Quoted>

                </header>
        );
}
