'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
import RenderCardsUI from './UI';
import { useEditBookProps } from '@/app/edit/page';
import { booksFamilyAtom } from '@/src/jotai/mainDbAtom';
import { useAtomValue } from 'jotai';

export function RenderCards() {
        const { bookId } = useEditBookProps();
        const bookAtom = useMemo(() => booksFamilyAtom(bookId), [bookId]);
        const { childrenIds } = useAtomValue(bookAtom);
        const allContainerRef = useRef<HTMLElement>(null);
        const rowVirtualizer = useVirtualizer({
                count: childrenIds.length,
                getScrollElement: () => allContainerRef.current,
                estimateSize: () => 500,
                measureElement: (el) => el?.getBoundingClientRect().height ?? 0
        });

        console.debug({childrenIds})


        return (
                <RenderCardsUI
                        {...{ cardsIds: childrenIds, allContainerRef, rowVirtualizer }}
                />
        );
}
