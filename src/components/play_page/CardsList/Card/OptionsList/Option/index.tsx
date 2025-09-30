'use client';

import { FullOption } from '@/src/types/mainDbGlobal';
import IndexMarker from '@/src/components/general/IndexMarker';
import { useAtomCallback } from 'jotai/utils';
import { saveChoice } from '@/src/jotai/historyAtoms';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function PlayOption({
        optionIndex,
        option,
        cardChoiceIndex,
        cardIndex
}: {
        optionIndex: number;
        option: FullOption;
        cardChoiceIndex: number;
        cardIndex: number;
}) {

        console.debug({cardChoiceIndex, option})

        const [isCorrect, setIsCorrect] = useState<boolean>();

        useEffect(() => {
                if (typeof cardChoiceIndex === "undefined") return;
                if (cardChoiceIndex === optionIndex) {
                        setIsCorrect(option.isCorrect)
                }
        }, []);

        const onClick = useAtomCallback((get, set) => {
                if (typeof cardChoiceIndex !== 'undefined') return;
                set(saveChoice, { cardIndex, optionIndex });
                setIsCorrect(option.isCorrect);
        });

        return (
                <div
                        onClick={onClick}
                        className={clsx(
                                'w-full items-center flex border border-gray-400 gap-2  rounded-md p-4 duration-100',
                                {
                                        'hover:bg-gray-300':
                                                typeof cardChoiceIndex ===
                                                'undefined',
                                        'bg-green-400': isCorrect,
                                        'bg-red-400':
                                                optionIndex === cardChoiceIndex &&
                                                !isCorrect
                                }
                        )}>
                        <IndexMarker index={optionIndex} />
                        <span className='flex-1'>{option.title}</span>
                </div>
        );
}
