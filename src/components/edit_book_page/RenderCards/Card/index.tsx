/*
 * 'to-do' - змінити іконку для видалення
 *  */

import { createPropsProvider } from '@/src/utils/createPropsProvider';
import { AvailableCardTypes } from '@/src/types/globals';
import { IndexContextProvider } from '@/src/components/edit_book_page/RenderCards/Card/CardHeader/client';
import CardHeader from '@/src/components/edit_book_page/RenderCards/Card/CardHeader';
import ExplicitCardContent from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent';
import TermDeterminationContent from '@/src/components/edit_book_page/RenderCards/Card/TermDeterminationContent';

interface CardProps {
        cardId: string;
        cardType: AvailableCardTypes;
}

export const { Provider: CardPropsProvider, usePropsContext: useCardProps } =
        createPropsProvider<CardProps>('card props context provider');

export default function Card({
        cardId,
        cardIndex,
        cardType
}: CardProps & { cardIndex: number; cardType: AvailableCardTypes }) {
        const content =
                cardType === 'explicit' ? (
                        <ExplicitCardContent />
                ) : (
                        <TermDeterminationContent />
                );
        return (
                <IndexContextProvider value={cardIndex}>
                        <CardPropsProvider cardType={cardType} cardId={cardId}>
                                <section className='questionCard'>
                                        <CardHeader />
                                        {content}
                                </section>
                        </CardPropsProvider>
                </IndexContextProvider>
        );
}
