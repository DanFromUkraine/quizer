import { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';

export default function ExplanationInputUI({
    cardId,
    onContainerClick,
    value,
    onChange
}: {
    cardId: string;
    onContainerClick: MouseEventHandler;
    value: string;
    onChange: ChangeEventHandler;
}) {
    return (
        <section
            className='bg-muted flex w-full flex-col gap-2 rounded-lg p-3.5'
            onClick={onContainerClick}>
            <h4 className='font-medium'>Explanation</h4>
        </section>
    );
}
