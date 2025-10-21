import clsx from 'clsx';
import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';

export default function MainQuestionTitleUI({
        value,
        onChange,
        cardId
}: {
        value: string;
        onChange: ChangeEventHandler;
        cardId: string;
}) {
        return (
                <Quoted variant='heading' className='heading-3 has-[:invalid]:bg-red-300'>
                        <ExtendableTextArea
                                data-testid='questionTitle'
                                value={value}
                                name={`card-title-${cardId}`}
                                placeholder='Enter text'
                                onChange={onChange}
                                className={'w-full'}
                                required
                        />
                </Quoted>
        );
}
