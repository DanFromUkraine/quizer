'use client';

import Dialog from '@/src/components/general/Dialog';
import { useAtomValue } from 'jotai';
import StoryItem from '@/src/components/general/StoryItem';
import { storiesForBookDialogInfoAtom } from '@/src/jotai/storiesForBookDialogInfoAtoms';
import CreateNewStoryButton from '@/src/components/books_page/BookStoryDialog/CreateNewStoryButton';
import { BP_TEST_IDS } from '@/src/constants/testIds';

export default function BookStoryDialog() {
        const { bookTitle, storyIds } = useAtomValue(
                storiesForBookDialogInfoAtom
        );

        return (
                <Dialog
                        testId={BP_TEST_IDS.bookStoriesDialog.me}
                        dialogName='storiesForBook'
                        className='bg-white p-6'>
                        <h2 className='heading-2'>
                                {`Some options already exist for '${bookTitle}' book. Choose one you want to resume, or create a new story`}
                        </h2>
                        <section className='grid grid-cols-3 gap-4'>
                                {storyIds.map((id) => (
                                        <StoryItem key={id} storyId={id} />
                                ))}
                                <CreateNewStoryButton />
                        </section>
                </Dialog>
        );
}
