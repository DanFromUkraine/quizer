import IndexMarker from '@/src/components/general/IndexMarker';
import { PP_TEST_IDS } from '@/src/constants/testIds';
import clsx from 'clsx';

export type OptionColorSchema = 'correct' | 'incorrect' | 'unchosen';

export default function LikeOptionUI({
    onClick,
    color,
    optionIndex,
    title,
    isSelected
}: {
    onClick?: () => void;
    color: OptionColorSchema;
    optionIndex: number;
    title: string;
    isSelected: boolean;
}) {
    return (
        <div
            data-testid={PP_TEST_IDS.expCard.option.me}
            onClick={onClick}
            data-selected={isSelected}
            className={clsx(
                'flex w-full items-center gap-2 rounded-md border p-4 duration-100',
                {
                    'border-gray-400 hover:bg-gray-300 data-[selected=true]:bg-gray-300':
                        color === 'unchosen',
                    'border-red-300 bg-white text-red-800 ring-1 ring-red-100':
                        color === 'incorrect',
                    'border-green-700 bg-green-300': color === 'correct'
                }
            )}>
            <IndexMarker
                index={optionIndex}
                className={clsx({
                    'bg-red-100 text-red-700': color === 'incorrect',
                    'bg-green-100 text-green-700': color === 'correct'
                })}
            />
            <span
                data-testid={PP_TEST_IDS.expCard.option.title}
                className='flex-1'>
                {title}
            </span>
        </div>
    );
}
