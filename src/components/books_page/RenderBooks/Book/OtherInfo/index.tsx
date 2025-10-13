"use client"

import DateBread from '@/src/components/general/DateBread';
import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';

export default function OtherInfo() {
        const { cardsLength, lastChangeDate } = useBookProps();

        return (
                <div className='flex justify-between'>
                        <span className='span'>{`${cardsLength} cards`}</span>
                        <DateBread timeMs={lastChangeDate} />
                </div>
        );
}
