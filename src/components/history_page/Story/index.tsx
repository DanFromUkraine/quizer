'use client';

import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import { getStoryResultsAtom } from '@/src/jotai/historyAtoms';
import { useMemo } from 'react';
import Link from 'next/link';
import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';

export default function Story({ storyId }: { storyId: string }) {
        const { isCompleted, cardIdsOrder } = useAtomValue(
                storiesAtomFamily(storyId)
        );
        const stableAtom = useMemo(() => getStoryResultsAtom(storyId), []);
        const { successPercentage, markIn12PointsSystem } =
                useAtomValue(stableAtom);

        return (
                <Link href={getDefaultPathToPlayPage(storyId)} className='flex flex-col p-6 w-full rounded-md glass hover:shadow-xl relative duration-100'>
                        <section className='flex justify-between'>
                                <span className='span'>
                                        {isCompleted
                                                ? 'completed'
                                                : 'incomplete'}
                                </span>
                                <span className='span'>{`${markIn12PointsSystem}/12`}</span>
                        </section>
                        <h2 className='heading-1'>{`${successPercentage}%`}</h2>
                        <span className='span'>{`cards number - ${cardIdsOrder.length}`}</span>
                </Link>
        );
}
