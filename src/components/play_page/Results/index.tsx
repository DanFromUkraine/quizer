'use client';

import { usePlayModeProps } from '@/app/play/page';
import { useAtomValue } from 'jotai';
import { getStoryResultsAtom } from '@/src/jotai/historyAtoms';
import Link from 'next/link';
import { useMemo } from 'react';

export function scoreToColor(score: number): string {
        const clamped = Math.max(0, Math.min(100, score)); // обмежуємо 0–100
        const hue = (clamped / 100) * 120; // 0 = червоний, 120 = зелений
        return `hsl(${hue}, 90%, 50%)`;
}

export default function Results() {
        const { isCompleted, storyId } = usePlayModeProps();
        const stableResAtom = useMemo(() => getStoryResultsAtom(storyId), []);
        const {
                successPercentage,
                markIn12PointsSystem,
                countAllPoints,
                countGainedPoints
        } = useAtomValue(stableResAtom);

        return (
                isCompleted && (
                        <section className='w-full flex flex-col items-center'>
                                <div className='flex gap-8 items-center'>
                                        <h2
                                                className='heading-1'
                                                style={{
                                                        color: scoreToColor(
                                                                successPercentage
                                                        )
                                                }}>
                                                {`${successPercentage}%`}
                                        </h2>
                                        <h2
                                                className='heading-1'
                                                style={{
                                                        color: scoreToColor(
                                                                successPercentage
                                                        )
                                                }}>
                                                {`${markIn12PointsSystem}/12`}
                                        </h2>
                                </div>

                                <div className='flex gap-2 items-center'>
                                        <Link
                                                href='/'
                                                className='text-white font-semibold bg-blue-400 py-3 px-5 rounded-xl hover:bg-blue-300 duration-100'>
                                                Home Page
                                        </Link>
                                        <Link
                                                href='/history'
                                                className='text-white font-semibold bg-green-400 py-3 px-5 rounded-xl hover:bg-green-300 duration-100'>
                                                History
                                        </Link>
                                </div>
                        </section>
                )
        );
}
