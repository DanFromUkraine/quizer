'use client';

import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export default function PageTitle() {
        const storyId = useAtomValue(currentStoryIdAtom);
        const { bookData } = useAtomValue(storiesAtomFamily(storyId));

        return (
                <h1 data-testid={PP_TEST_IDS.bookTitle} className='heading-1'>
                        {`Try out your knowledge with book '${bookData.title}'!`}
                </h1>
        );
}
