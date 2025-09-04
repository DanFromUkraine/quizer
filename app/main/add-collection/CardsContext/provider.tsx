import { CardsContext, useCardsContext } from './context';
import { ReactNode, useCallback, useState } from 'react';
import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';

export function useAddCard() {
        const { setCardsStateOnly } = useCardsContext();

        const addCard = useCallback(
                (newCard: CreateModeQuestionCardType) => {
                        setCardsStateOnly((prev) => [...prev, newCard]);
                },
                [setCardsStateOnly]
        );

        return { addCard };
}

function getFilteredByID(
        cards: CreateModeQuestionCardType[],
        cardIdToDelete: number
) {
        return cards.filter((card) => card.id !== cardIdToDelete);
}

export function useRemoveCard() {
        const { setCardsStateOnly } = useCardsContext();

        const removeCard = useCallback((cardIdToDelete: number) => {
                setCardsStateOnly((prev) => {
                        console.log({ prev, cardIdToDelete });
                        return getFilteredByID(prev, cardIdToDelete);
                });
        }, []);

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
