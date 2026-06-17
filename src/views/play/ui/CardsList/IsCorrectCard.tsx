'use client';

import { PP_TEST_IDS } from '@/src/constants/testIds';
import { isCorrectCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import {
    useIsCorrectCardCurrVal,
    useIsCorrectCardStatus
} from '@/src/views/play/model/CardsList/hooks';
import { useAtomValue } from 'jotai';

export default function IsCorrectCard({ cardId }: { cardId: string }) {
    const cardStatus = useIsCorrectCardStatus(cardId);

    return (
        <li
            data-testid={PP_TEST_IDS.isCorrectCard.me}
            data-status={cardStatus}
            className='questionCard w-full data-[status=correct]:bg-green-100 data-[status=incorrect]:bg-red-100'>
            <TermDefinitionTitle cardId={cardId} />
            <BooleanButtons cardId={cardId} />
        </li>
    );
}

function TermDefinitionTitle({ cardId }: { cardId: string }) {
    const { term, definition } = useAtomValue(
        isCorrectCardStoriesAtomFamily(cardId)
    );

    return (
        <div className='flex flex-wrap items-center gap-1'>
            <h2
                className='heading-2'
                data-testid={PP_TEST_IDS.isCorrectCard.term}>
                {term} -{' '}
            </h2>
            <h2
                className='heading-2 font-normal!'
                data-testid={PP_TEST_IDS.isCorrectCard.definition}>
                {definition}
            </h2>
        </div>
    );
}

function OneBooleanButton({
    textContent,
    onClickAction,
    isSelected,
    testId
}: {
    textContent: string;
    onClickAction: () => void;
    isSelected: boolean;
    testId: string;
}) {
    return (
        <button
            data-testid={testId}
            type='button'
            data-selected={isSelected}
            onClick={onClickAction}
            className='heading-3 rounded-md border border-gray-400 px-8 py-4 duration-100 hover:bg-gray-200 data-[selected=true]:bg-gray-200'>
            {textContent}
        </button>
    );
}

function BooleanButtons({ cardId }: { cardId: string }) {
    const [currVal, setCurrVal] = useIsCorrectCardCurrVal(cardId);
    const setTrue = () => setCurrVal(true);
    const setFalse = () => setCurrVal(false);

    return (
        <div className='flex gap-2'>
            <OneBooleanButton
                {...{
                    textContent: 'True',
                    onClickAction: setTrue,
                    isSelected: Boolean(currVal),
                    testId: PP_TEST_IDS.isCorrectCard.trueBtn
                }}
            />
            <OneBooleanButton
                {...{
                    textContent: 'False',
                    onClickAction: setFalse,
                    isSelected: currVal === false,
                    testId: PP_TEST_IDS.isCorrectCard.falseBtn
                }}
            />
        </div>
    );
}
