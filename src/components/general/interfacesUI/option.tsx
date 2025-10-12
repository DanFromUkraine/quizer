import IndexMarker from '@/src/components/general/IndexMarker';
import clsx from 'clsx';

export type OptionColorSchema = 'green' | 'red' | 'gray';

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
                        onClick={onClick}
                        data-selected={isSelected}
                        className={clsx(
                                'w-full items-center flex border gap-2 rounded-md p-4 duration-100',
                                {
                                        'border-gray-400 hover:bg-gray-300 data-[selected=true]:bg-gray-300':
                                                color === 'gray',
                                        'border-red-700  bg-[repeating-linear-gradient(45deg,theme(colors.red.300)_0_10px,transparent_10px_20px)]':
                                                color === 'red',
                                        'border-green-700 bg-green-300':
                                                color === 'green'
                                }
                        )}>
                        <IndexMarker index={optionIndex} />
                        <span className='flex-1'>{title}</span>
                </div>
        );
}
