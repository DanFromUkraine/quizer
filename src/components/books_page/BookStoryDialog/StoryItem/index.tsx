'use client';

import CompletionRate from '@/src/components/books_page/BookStoryDialog/StoryItem/CompletionRate';
import CompletionRateLikeBread from '@/src/components/books_page/BookStoryDialog/StoryItem/CompletionRateLikeBread';
import StoryCreationDate from '@/src/components/books_page/BookStoryDialog/StoryItem/CreationDate';
import DeleteStoryButton from '@/src/components/books_page/BookStoryDialog/StoryItem/DeleteStoryButton';

export default function StoryItem({ storyId }: { storyId: string }) {
        return (
                <div className='flex flex-col p-6 w-full rounded-md glass hover:shadow-xl relative'>
                        <CompletionRateLikeBread storyId={storyId} />
                        <DeleteStoryButton storyId={storyId} />
                        <CompletionRate storyId={storyId} />
                        <StoryCreationDate storyId={storyId} />
                </div>
        );
}
