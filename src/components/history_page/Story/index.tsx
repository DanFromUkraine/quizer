'use client';

import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import { getStoryResultsAtom } from '@/src/jotai/historyAtoms';
import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';
import { MdDeleteOutline } from 'react-icons/md';
import { deleteStoryAtom } from '@/src/jotai/historyAtoms';

export default function Story({ storyId }: { storyId: string }) {
        const { isCompleted, cardIdsOrder } = useAtomValue(
                storiesAtomFamily(storyId)
        );
        const stableAtom = useMemo(() => getStoryResultsAtom(storyId), []);
        const { successPercentage, markIn12PointsSystem } =
                useAtomValue(stableAtom);

        const onDeleteStoryClick = useAtomCallback(
                useCallback((_get, set) => {
                        void set(deleteStoryAtom, { storyId, bookId: '' });
                }, [])
        );

        return (
                <div className='glass relative flex w-full flex-col rounded-md p-6 duration-100 hover:shadow-xl'>
                        <section className='flex justify-between'>
                                <div className='flex flex-col text-gray-400'>
                                        <span className='span'>
                                                {isCompleted
                                                        ? 'completed'
                                                        : 'incomplete'}
                                        </span>
                                        <span className='span'>{`${markIn12PointsSystem}/12`}</span>
                                </div>
                                <button onClick={onDeleteStoryClick}>
                                        <MdDeleteOutline className='m-2 text-2xl text-red-400 hover:text-white' />
                                </button>
                        </section>
                        <Link
                                href={getDefaultPathToPlayPage(storyId)}
                                className='duration-100 hover:bg-gray-300 p-2 rounded-xl my-1'>
                                <h2 className='heading-1'>{`${successPercentage}%`}</h2>
                                <span className='span'>{`cards number - ${cardIdsOrder.length}`}</span>
                        </Link>
                </div>
        );
}
