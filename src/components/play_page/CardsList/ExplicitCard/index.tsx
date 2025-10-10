import PlayOptionsList from '@/src/components/play_page/CardsList/ExplicitCard/OptionsList';
import type {
        PlayExplicitCard,
        PlayNormalCard
} from '@/src/types/playMode';

export default function ExplicitCard({
        type,
        title,
        options,
        ...otherData
}: PlayExplicitCard | PlayNormalCard) {
        return (
                <li className='questionCard items-center w-full'>
                        <h3 className='heading-2'>{`'${title}'`}</h3>
                        <PlayOptionsList />
                </li>
        );
}
