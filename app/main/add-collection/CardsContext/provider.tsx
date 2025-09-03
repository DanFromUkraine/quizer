import { useCards } from '@/app/lib/db/ObservableCreateCollectionDB';
import { CardsContext, useCardsContext } from './context';
import { ReactNode, useCallback } from 'react';
import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';

export function useAddCard() {
        const { setCardsStateOnly } = useCardsContext()!;

        const addCard = useCallback((newCard: CreateModeQuestionCardType) => {
                setCardsStateOnly((prev) =>
                        prev.map((prevCard) =>
                                prevCard.id === newCard.id ? newCard : prevCard
                        )
                );
        }, []);

        return { addCard };
}

function getFilteredByID(
        cards: CreateModeQuestionCardType[],
        cardIdToDelete: number
) {
        return cards.filter((card) => card.id === cardIdToDelete);
}

export function useRemoveCard() {
        const { setCardsStateOnly } = useCardsContext()!;

        const removeCard = useCallback((cardIdToDelete: number) => {
                setCardsStateOnly((prev) =>
                        getFilteredByID(prev, cardIdToDelete)
                );
        }, []);

        return { removeCard };
}

export default function CardsContextProvider({
        children
}: {
        children: ReactNode;
}) {
        const { cards, setCardsStateOnly } = useCards();

        return (
                <CardsContext.Provider value={{ cards, setCardsStateOnly }}>
                        {children}
                </CardsContext.Provider>
        );
}
