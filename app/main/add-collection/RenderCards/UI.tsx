import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';
// import QuestionCard from "./QuestionCard";
import { RefObject } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';
import QuestionCard from '@/app/lib/commonComponents/QuestionCard';
import BtnWithShortcut from '@/app/lib/componentsUI/ButtonWithShortcut';
import { IndexContextProvider } from '@/app/lib/commonComponents/QuestionCard/CreateMode/CardIndex';

export default function RenderCardsUI({
        cards,
        allContainerRef,
        rowVirtualizer
}: {
        cards: CreateModeQuestionCardType[];
        allContainerRef: RefObject<HTMLElement | null>;
        rowVirtualizer: Virtualizer<HTMLElement, Element>;
}) {
        return (
                <section
                        ref={allContainerRef}
                        style={{ height: rowVirtualizer.getTotalSize() }}>
                        <div className='flex flex-col gap-2.5'>
                                {rowVirtualizer
                                        .getVirtualItems()
                                        .map((virtualItem, i) => {
                                                const cardData = cards[i];
                                                return (
                                                        <IndexContextProvider
                                                                value={i}
                                                                key={
                                                                        virtualItem.key
                                                                }>
                                                                <QuestionCard
                                                                        mode='create-mode'
                                                                        {...cardData}
                                                                />
                                                        </IndexContextProvider>
                                                );
                                        })}
                        </div>
                </section>
        );
}
