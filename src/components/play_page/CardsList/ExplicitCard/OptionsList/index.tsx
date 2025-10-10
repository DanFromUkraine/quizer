import { type PlayOption as OptionData } from '@/src/types/playMode';
import PlayOption from '@/src/components/play_page/CardsList/ExplicitCard/OptionsList/Option';

export default function PlayOptionsList({
        options
}: {
        options: OptionData[];
}) {
        return (
                <ul className='w-full flex flex-col gap-2'>
                        {options.map((option, i) => (
                                <PlayOption key={i} />
                        ))}
                </ul>
        );
}
