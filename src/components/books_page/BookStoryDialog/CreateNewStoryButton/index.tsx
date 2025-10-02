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
                        className='w-full glass hover:shadow-xl duration-100  rounded-md p-6 h-full flex'>
                        <FaPlus className='text-4xl text-white  mx-auto my-auto' />
                </div>
        );
}
