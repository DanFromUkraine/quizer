'use client';

import { FullOption } from '@/src/types/mainDbGlobal';
import IndexMarker from '@/src/components/general/IndexMarker';

export default function PlayOption({ option, index }: { index: number; option: FullOption }) {
        return (
                <div className='w-full items-center flex border border-gray-400 gap-2  rounded-md p-4 hover:bg-gray-300 duration-100'>
                        <IndexMarker index={index} />
                        <span className='flex-1'>{option.title}</span>
                </div>
        );
}
