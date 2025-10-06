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
        onChange: ChangeEventHandler
}) {
        return (
                <section
                        className='flex flex-col gap-2 p-3.5 rounded-lg bg-muted w-full'
                        onClick={onContainerClick}>
                        <h4 className='font-medium '>Explanation</h4>
                        <ExtendableTextArea
                                value={value}
                                onChange={onChange}
                                className='text-muted-foreground w-full'
                                id={`explanation-${cardId}`}></ExtendableTextArea>
                </section>
        );
}
