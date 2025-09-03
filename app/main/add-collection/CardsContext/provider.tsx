import { useCards } from '@/app/lib/db/ObservableCreateCollectionDB';
import { CardsContext, useCardsContext } from './context';
import { ReactNode, useCallback, useState } from 'react';
import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';

export function useAddCard() {
        const contextData = useCards()!;

        const addCard = useCallback(
                (newCard: CreateModeQuestionCardType) => {
                        console.log("i'm here");
                        if (!contextData.setCardsStateOnly) return;
                        contextData.setCardsStateOnly((prev) =>
                                prev.map((prevCard) =>
                                        prevCard.id === newCard.id
                                                ? newCard
                                                : prevCard
                                )
                        );
                },
                [contextData.setCardsStateOnly]
        );

        return { addCard };
}

function getFilteredByID(
        cards: CreateModeQuestionCardType[],
        cardIdToDelete: number
) {
        return cards.filter((card) => card.id === cardIdToDelete);
}

export function useRemoveCard() {
        const contextData = useCards()!;

        const removeCard = useCallback(
                (cardIdToDelete: number) => {
                        if (!contextData.setCardsStateOnly) return;
                        contextData.setCardsStateOnly((prev) =>
                                getFilteredByID(prev, cardIdToDelete)
                        );
                },
                [contextData]
        );

        return { removeCard };
}

function useCardsStateOnly() {
        const [cards, setCardsStateOnly] = useState<
                CreateModeQuestionCardType[]
        >([]);

        return { cards, setCardsStateOnly };
}

export default function CardsContextProvider({
        children
}: {
        children: ReactNode;
}) {
        const { cards, setCardsStateOnly } = useCardsStateOnly();

        return (
                <CardsContext.Provider
                        value={{
                                cards,
                                setCardsStateOnly
                        }}>
                        {children}
                </CardsContext.Provider>
        );
}
