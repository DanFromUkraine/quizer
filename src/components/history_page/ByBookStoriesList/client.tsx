import { StoriesByBook } from '@/src/types/historyPage';
import StoryItem from '@/src/components/general/StoryItem';
import NothingYetMessage from '@/src/components/general/NothingYet';
import Story from '@/src/components/history_page/Story';

export default function BookAndItsStories({
        bookTitle,
        storyIds
}: StoriesByBook) {
        return (
                <li>
                        <h2 className='heading-2'>{`'${bookTitle}'`}</h2>
                        <div className='grid gap-4 grid-cols-3 max-md:grid-cols-2 max-@sm:grid-cols-1'>
                                {storyIds.map((storyId) => (
                                        <Story
                                                key={storyId}
                                                storyId={storyId}
                                        />
                                ))}
                                <NothingYetMessage message='No stories yet' listLength={storyIds.length} />
                        </div>
                </li>
        );
}
