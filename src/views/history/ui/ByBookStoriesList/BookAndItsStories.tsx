import { StoriesByBook } from '@/src/types/historyPage';
import NothingYetMessage from '@/src/components/general/NothingYet';
import Story from '../Story';

export default function BookAndItsStories({
    bookTitle,
    storyIds
}: StoriesByBook) {
    return (
        <li>
            <h2 className='heading-2'>{`'${bookTitle}'`}</h2>
            <div className='max-@sm:grid-cols-1 grid grid-cols-3 gap-4 max-md:grid-cols-2'>
                {storyIds.map((storyId) => (
                    <Story key={storyId} storyId={storyId} />
                ))}
                <NothingYetMessage
                    message='No stories yet'
                    listLength={storyIds.length}
                />
            </div>
        </li>
    );
}
