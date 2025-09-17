import { RefObject } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';
import Card from '@/src/components/edit_book_page/RenderCards/Card';
import AddEmptyCardButton from '@/src/components/edit_book_page/AddCardButton';

export default function RenderCardsUI({
        cardsIds,
        allContainerRef,
        rowVirtualizer
}: {
        cardsIds: string[];
        allContainerRef: RefObject<HTMLElement | null>;
        rowVirtualizer: Virtualizer<HTMLElement, Element>;
}) {
        return (
                <section
                        ref={allContainerRef}
                        style={{ height: rowVirtualizer.getTotalSize() }}>
                        <div className='flex flex-col items-center gap-3'>
                                {rowVirtualizer
                                        .getVirtualItems()
                                        .map((virtualItem, i) => {
                                                const cardId = cardsIds[i];
                                                return (
                                                        <Card
                                                                key={
                                                                        virtualItem.key
                                                                }
                                                                cardId={cardId}
                                                        />
                                                );
                                        })}
                                <AddEmptyCardButton />
                        </div>
                </section>
        );
}
