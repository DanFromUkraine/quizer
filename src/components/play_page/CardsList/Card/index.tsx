import { FullCard } from '@/src/types/mainDbGlobal';
import PlayOptionsList from '@/src/components/play_page/CardsList/Card/OptionsList';

export default function PlayCard({ card }: { card: FullCard }) {
        return (
                <li className="questionCard items-center w-full">
                        <h3 className='heading-2'>{`'${card.title}'`}</h3>
                        <PlayOptionsList options={card.options}/>
                </li>
        );
}
