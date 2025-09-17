import clsx from 'clsx';
import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';

export default function QuestionTitleUI({
        defaultValue,
        onChange,
        cardId
}: {
        defaultValue: string;
        onChange: ChangeEventHandler;
        cardId: string;
}) {
        return (
                <Quoted>
                        <ExtendableTextArea
                                data-testid='questionTitle'
                                defaultValue={defaultValue}
                                name={`card-title-${cardId}`}
                                placeholder='Enter text'
                                onChange={onChange}
                                className={clsx(
                                        'w-full'
                                )}
                        />
                </Quoted>
        );
}
