'use client';

import { usePlayModeProps } from '@/src/views/play/model/play-mode-props';
import { useAtomValue } from 'jotai';
import { getStoryResultsAtom } from '@/src/jotai/historyAtoms';
import Link from 'next/link';
import { useMemo } from 'react';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export function scoreToColor(score: number): string {
    const clamped = Math.max(0, Math.min(100, score)); // обмежуємо 0–100
    const hue = (clamped / 100) * 120; // 0 = червоний, 120 = зелений
    return `hsl(${hue}, 90%, 50%)`;
}

export default function Results() {
    const { isCompleted, storyId } = usePlayModeProps();
    const stableResAtom = useMemo(() => getStoryResultsAtom(storyId), []);
    const { successPercentage, markIn12PointsSystem } =
        useAtomValue(stableResAtom);

    return (
        isCompleted && (
            <section className='flex w-full flex-col items-center'>
                <div className='flex items-center gap-8'>
                    <h2
                        data-testid={PP_TEST_IDS.successPercentage}
                        className='heading-1'
                        style={{
                            color: scoreToColor(successPercentage)
                        }}>
                        {`${successPercentage}%`}
                    </h2>
                    <h2
                        className='heading-1'
                        style={{
                            color: scoreToColor(successPercentage)
                        }}>
                        {`${markIn12PointsSystem}/12`}
                    </h2>
                </div>

                <div className='flex items-center gap-2'>
                    <Link
                        href='/'
                        className='rounded-xl bg-blue-400 px-5 py-3 font-semibold text-white duration-100 hover:bg-blue-300'>
                        Home Page
                    </Link>
                    <Link
                        href='/history'
                        className='rounded-xl bg-green-400 px-5 py-3 font-semibold text-white duration-100 hover:bg-green-300'>
                        History
                    </Link>
                </div>
            </section>
        )
    );
}
