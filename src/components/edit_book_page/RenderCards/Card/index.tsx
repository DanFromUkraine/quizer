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
                        <section className='questionCard'>
                                <div className='flex justify-between items-center'>
                                        <CardIndex />
                                        <DeleteCardButton />
                                </div>
                                <div className='container items-center'>
                                        <div className='w-11/12 flex flex-col gap-4'>
                                                <QuestionTitle />
                                                <RenderOptions />
                                        </div>
                                </div>
                        </section>
                </CardPropsProvider>
        );
}
