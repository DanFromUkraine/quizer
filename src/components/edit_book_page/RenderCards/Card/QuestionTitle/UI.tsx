import clsx from 'clsx';
import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';

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
                <div className='container items-center'>
                        <div className='flex gap-2 bg-gray-300 heading-3 font-medium rounded-md p-3 w-10/12'>
                                <span>"</span>
                                <ExtendableTextArea
                                        data-testid='questionTitle'
                                        defaultValue={defaultValue}
                                        name={`card-title-${cardId}`}
                                        placeholder='Enter text'
                                        onChange={onChange}
                                        className={clsx(
                                                'focus-within:outline-none w-full'
                                        )}
                                />

                                <span>"</span>
                        </div>
                </div>
        );
}
