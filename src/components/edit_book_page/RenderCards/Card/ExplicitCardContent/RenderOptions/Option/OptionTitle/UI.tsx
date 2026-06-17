import { ChangeEventHandler } from 'react';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function OptionTitleUI({
    value,
    onChange,
    optionId,
    disabled
}: {
    value: string;
    onChange: ChangeEventHandler;
    optionId: string;
    disabled: boolean;
}) {
    return (
        <input
            disabled={disabled}
            name={`option-${optionId}`}
            type='text'
            value={value}
            onChange={onChange}
            data-testid={
                EP_TEST_IDS.card.explicitCardContent.option.mainOptBody.titleInp
            }
            className='pointer-events-auto h-9 min-w-0 flex-1 rounded-[10px] border border-[#dfe3ea] bg-[#fafbfc] px-2.5 text-[#222] duration-100 group-data-[status=correct]:border-green-300 group-data-[status=correct]:bg-green-50 disabled:cursor-not-allowed'
        />
    );
}
