import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import Quoted from '@/src/components/general/Quoted';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function MainQuestionTitleUI({
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
                <Quoted
                        variant='heading'
                        className='heading-3 has-[:invalid]:bg-red-300'>
                        <ExtendableTextArea
                                testId={
                                        EP_TEST_IDS.card.explicitCardContent
                                                .titleInp
                                }
                                value={value}
                                name={`card-title-${cardId}`}
                                placeholder='Enter text'
                                onChange={onChange}
                                className={'w-full'}
                                required
                                disabled={disabled}
                        />
                </Quoted>
        );
}
