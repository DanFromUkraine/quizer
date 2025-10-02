import { StoriesByBook } from '@/src/types/historyPage';
import StoryItem from '@/src/components/general/StoryItem';

export default function BookAndItsStories({
        bookTitle,
        storyIds
}: StoriesByBook) {
        return (
                <li>
                        <h2 className='heading-2'>{`'${bookTitle}'`}</h2>
                        <div className='grid gap-4 grid-cols-3'>
                                {storyIds.map((storyId) => (
                                        <StoryItem
                                                key={storyId}
                                                storyId={storyId}
                                        />
                                ))}
                        </div>
                </li>
        );
}
