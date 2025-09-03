import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';
// import QuestionCard from "./QuestionCard";
import { RefObject } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';
import QuestionCard from '@/app/lib/commonComponents/QuestionCard';
import BtnWithShortcut from '@/app/lib/componentsUI/ButtonWithShortcut';
import { IndexContextProvider } from '@/app/lib/commonComponents/QuestionCard/CreateMode/CardIndex';

export default function RenderCardsUI({
        cards,
        addEmptyCard,
        allContainerRef,
        rowVirtualizer
}: {
        cards: CreateModeQuestionCardType[];
        addEmptyCard: () => void;
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
                        <section className='w-full flex justify-center pt-4'>
                                <BtnWithShortcut
                                        textContent='Add card'
                                        onClick={() => addEmptyCard()}
                                        type='button'
                                        shortcutKeys={['Ctrl', 'M']}
                                        otherAttributes={{
                                                'data-testid': 'add-card'
                                        }}
                                />
                        </section>
                </section>
        );
}
