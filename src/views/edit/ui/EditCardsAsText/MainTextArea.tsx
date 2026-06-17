import { useAtom } from 'jotai';
import { cardsTextAtom } from '@/src/jotai/cardsAsTextAtoms';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import { ChangeEventHandler } from 'react';
import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export function MainTextArea() {
    const [cardsTextValue, setCardsText] = useAtom(cardsTextAtom);
    const onChange = getInputChangeCallback((newVal) => {
        setCardsText(newVal);
    }) as unknown as ChangeEventHandler<HTMLTextAreaElement>;

    return (
        <div className='max-h-[72vh] min-h-[50vh] overflow-y-auto'>
            <ExtendableTextArea
                name='cards text input'
                testId={EP_TEST_IDS.cardsAsTextDialog.mainInp}
                className='min-h-[50vh] w-full text-base leading-7'
                placeholder='some description yata-yata'
                value={cardsTextValue}
                onChange={onChange}
            />
        </div>
    );
}