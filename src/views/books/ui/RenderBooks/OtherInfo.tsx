'use client';

import DateBread from '@/src/shared/ui/DateBread';
import { useBookProps } from '@/src/views/books/ui/RenderBooks/index';

export default function OtherInfo() {
    const { cardsLength, lastChangeDate } = useBookProps();

    return (
        <div className='flex justify-between'>
            <span className='span'>{`${cardsLength} cards`}</span>
            <DateBread timeMs={lastChangeDate} />
        </div>
    );
}
