import { createPropsProvider } from '@/src/utils/createPropsProvider';
import CardIndex from './CardIndex';
import DeleteCardButton from './DeleteCardButton';
import QuestionTitle from './QuestionTitle';
import RenderOptions from './RenderOptions';

interface CardProps {
        cardId: string;
}

export const { Provider: CardPropsProvider, usePropsContext: useCardProps } =
        createPropsProvider<CardProps>('card props context provider');

export default function Card({ cardId }: CardProps) {
        return (
                <CardPropsProvider cardId={cardId}>
                        <section className='questionCard' >
                                <div className='flex justify-between items-center'>
                                        <CardIndex />
                                        <DeleteCardButton />
                                </div>
                                <QuestionTitle />
                                <RenderOptions />
                        </section>
                </CardPropsProvider>
        );
}
