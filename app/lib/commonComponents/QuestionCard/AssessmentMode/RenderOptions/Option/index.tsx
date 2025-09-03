'use client';

import { useTickOption } from '@/app/lib/db/History';
import { TestOption } from '@/app/lib/db/History/types';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

function useClickOption({
        isCorrect,
        optionIndex,
        questionIndex
}: {
        isCorrect: boolean;
        optionIndex: number;
        questionIndex: number;
}) {
        const { tickOption } = useTickOption();
        const ticked = useRef(false);

        const onTick = useCallback(() => {
                if (ticked.current) return;
                tickOption({ questionIndex, optionIndex });
        }, []);

        return { onTick };
}

export default function Option({
        isCorrect,
        optionText,
        optionIndex,
        questionIndex,
        optionChosen,
        anyOptionChosen
}: TestOption & {
        optionIndex: number;
        questionIndex: number;
        anyOptionChosen: boolean;
}) {
        const [correct, setCorrect] = useState<'correct' | 'incorrect' | ''>(
                optionChosen ? (isCorrect ? 'correct' : 'incorrect') : ''
        );
        const { onTick } = useClickOption({
                questionIndex,
                optionIndex,
                isCorrect
        });

        const showIsCorrect = useCallback(() => {
                setCorrect(isCorrect ? 'correct' : 'incorrect');
        }, []);

        useEffect(() => {
                if (optionChosen) showIsCorrect();
        }, [optionChosen]);

        const onClick = () => {
                showIsCorrect();
                onTick();
        };

        console.log({
                isCorrect,
                optionChosen,
                optionIndex,
                questionIndex,
                anyOptionChosen,
                correct
        });

        return (
                <div
                        className={clsx(
                                'w-full h-full min-h-[60px] p-4 border-2 rounded-normal border-lightGray'
                        )}
                        onClick={onClick}
                        style={{
                                backgroundColor: correct
                                        ? correct === 'correct'
                                                ? 'green'
                                                : 'red'
                                        : ''
                        }}>
                        {optionText}
                </div>
        );
}
