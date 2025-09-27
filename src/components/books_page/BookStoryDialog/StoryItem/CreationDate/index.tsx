import DateBread from '@/src/components/general/DateBread';
import { useAtomValue } from 'jotai';
import { historyFamilyAtom } from '@/src/jotai/mainAtoms';

export default function StoryCreationDate({ storyId }: { storyId: string }) {
        const { playStartDate } = useAtomValue(historyFamilyAtom(storyId));
        return <DateBread timeMs={playStartDate} className='ml-auto mt-3' />;
}
