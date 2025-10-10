'use client';

import IndexMarker from '@/src/components/general/IndexMarker';
import clsx from 'clsx';

export default function PlayOption({ optionIndex }: { optionIndex: number }) {
        return (
                <div
                        onClick={onClick}
                        className={clsx(
                                'w-full items-center flex border border-gray-400 gap-2  rounded-md p-4 duration-100',
                                {
                                        'hover:bg-gray-300':
                                                typeof cardChoiceIndex ===
                                                'undefined',
                                        'bg-green-400': isCorrect,
                                        'bg-red-400':
                                                optionIndex ===
                                                        cardChoiceIndex &&
                                                !isCorrect
                                }
                        )}>
                        <IndexMarker index={optionIndex} />
                        <span className='flex-1'>{option.title}</span>
                </div>
        );
}
