import { FullOption } from '@/src/types/mainDbGlobal';
import PlayOption from '@/src/components/play_page/CardsList/Card/OptionsList/Option';

export default function PlayOptionsList({
        options,
        cardIndex,
        cardChoiceIndex
}: {
        options: FullOption[];
        cardIndex: number;
        cardChoiceIndex: number;
}) {
        return (
                <ul className='w-full flex flex-col gap-2'>
                        {options.map((option, i) => (
                                <PlayOption
                                        key={i}
                                        cardChoiceIndex={cardChoiceIndex}
                                        cardIndex={cardIndex}
                                        optionIndex={i}
                                        option={option}
                                />
                        ))}
                </ul>
        );
}
