'use client';

import { useCards } from '@/app/lib/db/ObservableCreateCollectionDB';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import RenderCardsUI from './UI';

export default function RenderCards() {
        const { cards } = useCards();

        console.log({ cards });

        const allContainerRef = useRef<HTMLElement>(null);
        const rowVirtualizer = useVirtualizer({
                count: cards.length,
                getScrollElement: () => allContainerRef.current,
                estimateSize: () => 500
        });

        console.log('render cards');

        return (
                <RenderCardsUI
                        {...{
                                cards,
                                rowVirtualizer,
                                allContainerRef
                        }}
                />
        );
}
