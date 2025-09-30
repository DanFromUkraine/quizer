/* 'to-do' - додати можлживість видалити карточку
 * 'to-do' - змінити іконку для видалення

*
*  */

import { createPropsProvider } from '@/src/utils/createPropsProvider';
import CardIndex from './CardHeader/CardIndex';
import DeleteCardButton from './CardHeader/DeleteCardButton';
import ShortOrExplicitCardSegregator
        from '@/src/components/edit_book_page/RenderCards/Card/ShortOrExplicitCardSegregator';

interface CardProps {
        cardId: string;
}

export const { Provider: CardPropsProvider, usePropsContext: useCardProps } =
        createPropsProvider<CardProps>('card props context provider');

export default function Card({ cardId }: CardProps) {
        return (
                <CardPropsProvider cardId={cardId}>
                        <section className='questionCard'>

                                <ShortOrExplicitCardSegregator />
                        </section>
                </CardPropsProvider>
        );
}
