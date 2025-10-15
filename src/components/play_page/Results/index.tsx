'use client';

import { usePlayModeProps } from '@/app/play/page';
import { useAtomValue } from 'jotai';
import { getStoryResultsAtom } from '@/src/jotai/historyAtoms';
import Link from 'next/link';
import { useMemo } from 'react';

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
                        <section className='w-full flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                        <h2 className='heading-1'>
                                                {successPercentage}
                                        </h2>
                                        <h2 className='heading-1'>
                                                {markIn12PointsSystem}
                                        </h2>
                                </div>
                                <div className='flex gap-2 items-center'>
                                        <Link href='/'>Home Page</Link>
                                        <Link href='/history'>History</Link>
                                </div>
                        </section>
                )
        );
}
