import { ChangeEventHandler } from 'react';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function OptionTitleUI({
        value,
        onChange,
        optionId
}: {
        value: string;
        onChange: ChangeEventHandler;
        optionId: string;
}) {
        return (
                <input
                        name={`option-${optionId}`}
                        type='text'
                        value={value}
                        onChange={onChange}
                        data-testid={
                                EP_TEST_IDS.card.explicitCardContent.option
                                        .title
                        }
                        className='w-full pointer-events-auto p-3 bg-gray-200 group-data-[status=correct]:!bg-green-200 group-hover:bg-gray-300 duration-100'
                />
        );
}
