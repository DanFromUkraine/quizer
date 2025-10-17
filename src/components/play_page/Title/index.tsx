'use client';

import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';

export default function PageTitle() {
        const storyId = useAtomValue(currentStoryIdAtom);
        const { bookData } = useAtomValue(storiesAtomFamily(storyId));

        return (
                <h1 className='heading-1'>
                        {`Try out your knowledge with book '${bookData.title}'!`}
                </h1>
        );
}
