'use client';

import { MouseEventHandler } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { MdDeleteOutline } from 'react-icons/md';
import { deleteStoryAtom } from '@/src/jotai/historyAtoms';
import { updateBookStoriesDataAtom } from '@/src/jotai/storiesForBookDialogInfoAtoms';
import { currentBookIdForStoriesDialogAtom } from '@/src/jotai/idManagers';

export default function DeleteStoryButton({ storyId }: { storyId: string }) {
        const onDeleteButtonClick: MouseEventHandler<HTMLDivElement> =
                useAtomCallback(async (get, set, e) => {
                        e.stopPropagation();
                        const bookId = get(currentBookIdForStoriesDialogAtom);
                        await set(deleteStoryAtom, storyId);
                        set(updateBookStoriesDataAtom, bookId);
                });

        return (
                <div
                        className='absolute top-0 right-0 bg-red-200 hover:bg-red-500 duration-100 rounded-bl-2xl rounded-tr-md group'
                        onClick={onDeleteButtonClick}>
                        <MdDeleteOutline className='text-red-400 group-hover:text-white  text-2xl m-2' />
                </div>
        );
}
