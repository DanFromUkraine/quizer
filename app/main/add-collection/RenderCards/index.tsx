'use client';

import {
        useAddEmptyCard,
        useCards
} from '@/app/lib/db/ObservableCreateCollectionDB';
// import { cardsAtom } from "@/app/lib/jotai/addCollection";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import RenderCardsUI from './UI';

export default function RenderCards() {
        const { addEmptyCard } = useAddEmptyCard();
        // const cards = useAtomValue(cardsAtom);
        const { cards } = useCards();

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
                                addEmptyCard,
                                rowVirtualizer,
                                allContainerRef
                        }}
                />
        );
}
