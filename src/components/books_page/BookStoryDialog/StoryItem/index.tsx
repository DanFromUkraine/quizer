import CompletionRate from '@/src/components/books_page/BookStoryDialog/StoryItem/CompletionRate';
import CompletionRateLikeBread from '@/src/components/books_page/BookStoryDialog/StoryItem/CompletionRateLikeBread';
import StoryCreationDate from '@/src/components/books_page/BookStoryDialog/StoryItem/CreationDate';
import DeleteStoryButton from '@/src/components/books_page/BookStoryDialog/StoryItem/DeleteStoryButton';
import { redirect } from 'next/navigation';
import getDefaultPathToPlayPage from '@/src/utils/getDefPathToPlayPage';

export default function StoryItem({ storyId }: { storyId: string }) {
        const onClick = () => {
                redirect(getDefaultPathToPlayPage(storyId));
        };
        return (
                <div
                        onClick={onClick}
                        className='flex flex-col p-6 w-full rounded-md glass hover:shadow-xl relative'>
                        <CompletionRateLikeBread storyId={storyId} />
                        <DeleteStoryButton storyId={storyId} />
                        <CompletionRate storyId={storyId} />
                        <StoryCreationDate storyId={storyId} />
                </div>
        );
}
