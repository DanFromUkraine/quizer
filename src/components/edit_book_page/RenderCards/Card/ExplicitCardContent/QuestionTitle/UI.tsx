import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function QuestionTitleUI({
    value,
    onChange,
    cardId,
    disabled
}: {
    value: string;
    onChange: ChangeEventHandler;
    cardId: string;
    disabled?: boolean;
}) {
    return (
        <ExtendableTextArea
            testId={EP_TEST_IDS.card.explicitCardContent.titleInp}
            value={value}
            name={`card-title-${cardId}`}
            placeholder='Question'
            onChange={onChange}
            className='min-h-[72px] w-full rounded-[10px]! border-[#dfe3ea]! bg-[#fafbfc]! p-3.5! text-[#222] invalid:bg-red-100'
            required
            disabled={disabled}
        />
    );
}
