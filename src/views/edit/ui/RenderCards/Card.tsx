import { createContext, useContext } from 'react';
import { createPropsProvider } from '@/src/utils/createPropsProvider';
import { AvailableCardTypes } from '@/src/types/globals';
import { getCardType } from '@/src/utils/lists';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import CardHeader from './CardHeader';
import ExplicitCardContent from './ExplicitCardContent';
import TermDeterminationContent from './TermDeterminationContent';

interface CardProps {
    cardId: string;
    cardType: AvailableCardTypes;
}

const CardIndexContext = createContext<number>(0);

export const { Provider: CardPropsProvider, usePropsContext: useCardProps } =
    createPropsProvider<CardProps>('card props context provider');

export function useCardIndex() {
    return useContext(CardIndexContext);
}

export default function Card({
    cardId,
    cardIndex,
    explicitCardIds,
    shortCardIds
}: {
    cardIndex: number;
    explicitCardIds: string[];
    shortCardIds: string[];
    cardId: string;
}) {
    const cardType = getCardType({
        targetId: cardId,
        explicitCardIds,
        shortCardIds
    });

    return (
        <CardIndexContext.Provider value={cardIndex}>
            <CardPropsProvider cardType={cardType} cardId={cardId}>
                <section
                    data-testid={EP_TEST_IDS.card.me}
                    className='questionCard has-invalid:bg-red-100'>
                    <CardHeader />
                    {cardType === 'explicit' ? (
                        <ExplicitCardContent />
                    ) : (
                        <TermDeterminationContent />
                    )}
                </section>
            </CardPropsProvider>
        </CardIndexContext.Provider>
    );
}
