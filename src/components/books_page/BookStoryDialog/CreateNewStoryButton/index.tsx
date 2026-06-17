'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { storiesForBookDialogInfoAtom } from '@/src/jotai/storiesForBookDialogInfoAtoms';
import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';
import { FaPlus } from 'react-icons/fa';

export default function CreateNewStoryButton() {
    const router = useRouter();
    const { createOnAddNewStoryClick } = useAtomValue(
        storiesForBookDialogInfoAtom
    );
    const onClick = createOnAddNewStoryClick((storyId) =>
        router.push(getDefaultPathToPlayPage(storyId))
    );

    return (
        <div
            role='button'
            onClick={onClick}
            className='glass flex h-full w-full rounded-md p-6 duration-100 hover:shadow-xl'>
            <FaPlus className='mx-auto my-auto text-4xl text-white' />
        </div>
    );
}
