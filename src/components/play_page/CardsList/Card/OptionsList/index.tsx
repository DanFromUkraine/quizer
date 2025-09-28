import { FullOption } from '@/src/types/mainDbGlobal';
import PlayOption from '@/src/components/play_page/CardsList/Card/OptionsList/Option';

export default function PlayOptionsList({
        options
}: {
        options: FullOption[];
}) {
        return (
                <ul className='w-full flex flex-col gap-2'>
                        {options.map((option, i) => (
                                <PlayOption key={i} index={i} option={option} />
                        ))}
                </ul>
        );
}
