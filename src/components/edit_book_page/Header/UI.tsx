import Quoted from '@/src/components/general/Quoted';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import StableInput from '../../general/StableInput';

export default function HeaderUI({
        value,
        setValue
}: {
        value: string;
        setValue: (s: string) => void;
}) {
        return (
                <header className='flex items-center justify-start gap-3 max-[412px]:flex-col max-[412px]:items-start'>
                        <h3 className='heading-1'>Edit book</h3>
                        <Quoted
                                variant='large-heading'
                                className='!text-gray-700 heading-1 p-1 px-3 !w-fit max-[412px]:max-w-[calc(100vw-30px)]'>
                                <StableInput
                                        {...{
                                                testId: EP_TEST_IDS.bookTitleInp,
                                                type: 'text',
                                                name: 'book-title',
                                                className: 'field-sizing-content heading-1 !text-gray-700 !mb-0 max-[412px]:w-full max-[412px]:field-sizing-fixed',
                                                inputValue: value,
                                                setInputValue: setValue
                                        }}
                                />
                                {/*<input
                                        data-testid={EP_TEST_IDS.bookTitleInp}
                                        type='text'
                                        name='book-title'
                                        className='field-sizing-content heading-1 !text-gray-700 !mb-0 max-[412px]:w-full max-[412px]:field-sizing-fixed'
                                        placeholder="Book's title"
                                        value={value}
                                        onChange={onChange}
                                />*/}
                        </Quoted>
                </header>
        );
}
