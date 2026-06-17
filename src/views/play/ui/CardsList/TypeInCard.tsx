'use client';

import { PP_TEST_IDS } from '@/src/constants/testIds';
import { typeInCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import getInputChangeCallback from '@/src/utils/getInputChangeCallback';
import {
    useTypeInCardAnswerReveal,
    useTypeInCardCurrVal,
    useTypeInCardIsCorrect
} from '@/src/views/play/model/CardsList/hooks';
import { usePlayModeProps } from '@/src/views/play/model/play-mode-props';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';

export default function TypeInCard({ cardId }: { cardId: string }) {
    const isCorrect = useTypeInCardIsCorrect(cardId);

    return (
        <li
            data-testid={PP_TEST_IDS.typeInCard.me}
            data-correct={isCorrect}
            className='questionCard w-full data-[correct=false]:!bg-red-100 data-[correct=true]:!bg-green-100'>
            <Definition cardId={cardId} />
            <TypeInCardStoryInput cardId={cardId} />
            <RevealAnswerButton cardId={cardId} />
        </li>
    );
}

function TypeInCardStoryInput({ cardId }: { cardId: string }) {
    const [currVal, setCurrVal] = useTypeInCardCurrVal(cardId);
    const onChange = getInputChangeCallback(setCurrVal);
    const isCorrect = useTypeInCardIsCorrect(cardId);
    const { expectedInput } = useAtomValue(typeInCardStoriesAtomFamily(cardId));
    const inputRef = useRef<HTMLInputElement>(null);

    const onContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            className='flex w-full items-center gap-2 rounded-md border border-gray-400 p-4 has-[:focus]:border-2'
            onClick={onContainerClick}>
            <input
                ref={inputRef}
                name='play-typeInCard'
                data-correct={isCorrect}
                data-testid={PP_TEST_IDS.typeInCard.termInput}
                placeholder='enter definition'
                className='field-sizing-content data-[correct=false]:!line-through'
                value={currVal}
                onChange={onChange}
            />
            {typeof expectedInput === 'string' && isCorrect === false && (
                <span data-testid={PP_TEST_IDS.typeInCard.expectedValue}>
                    {expectedInput}
                </span>
            )}
        </div>
    );
}

function RevealAnswerButton({ cardId }: { cardId: string }) {
    const { showAnswersImmediately } = usePlayModeProps();
    const { onRevealButtonClick } = useTypeInCardAnswerReveal(cardId);
    return (
        showAnswersImmediately && (
            <button
                data-testid={PP_TEST_IDS.typeInCard.revealAnswerButton}
                onClick={onRevealButtonClick}
                className='ml-auto rounded-md bg-blue-500 px-3 py-1.5 text-white duration-100 hover:bg-blue-300'>
                Show if correct
            </button>
        )
    );
}

function Definition({ cardId }: { cardId: string }) {
    const { definition } = useAtomValue(typeInCardStoriesAtomFamily(cardId));
    return (
        <h3
            data-testid={PP_TEST_IDS.typeInCard.definition}
            className='heading-2 mx-auto'>{`'${definition}'`}</h3>
    );
}
