import type { PlayExplicitCard, PlayNormalCard } from '@/src/types/playMode';
import Option, {
        Subtitle
} from '@/src/components/play_page/CardsList/ExplicitCard/client';

export default function ExplicitCard({
        title,
        options,
        cardIndex,
        ...otherData
}: (PlayExplicitCard | PlayNormalCard) & { cardIndex: number }) {
        return (
                <li className='questionCard items-center w-full'>
                        <h3 className='heading-2'>{`'${title}'`}</h3>
                        <Subtitle
                                subtitle={
                                        otherData.type === 'play-explicit'
                                                ? otherData.subtitle
                                                : ''
                                }
                        />
                        <ul className='w-full flex flex-col gap-2'>
                                {options.map((option, i) => (
                                        <Option
                                                {...option}
                                                cardIndex={cardIndex}
                                                optionIndex={i}
                                                key={i}
                                        />
                                ))}
                        </ul>
                </li>
        );
}
