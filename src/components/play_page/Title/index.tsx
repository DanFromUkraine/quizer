'use client';

import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import { PP_TEST_IDS } from '@/src/constants/testIds';
import { usePlayModeProps } from '@/app/play/page';

export default function PageTitle() {
        const { storyId } = usePlayModeProps();
        const { bookData } = useAtomValue(storiesAtomFamily(storyId));
        console.debug({ bookData });

        return (
                <h1 data-testid={PP_TEST_IDS.bookTitle} className='heading-1'>
                        {`Try out your knowledge with book '${bookData.title}'!`}
                </h1>
        );
}
