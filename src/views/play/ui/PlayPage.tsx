'use client';

import { useAtomValue } from 'jotai';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import { PlayCardsListProvider } from '../model/play-mode-props';
import CardsList from './CardsList';
import FinishButton from './FinishButton';
import Results from './Results';
import PageTitle from './Title';

type PlayPageProps = {
    storyId?: string;
};

export function PlayPage({ storyId }: PlayPageProps) {
    if (typeof storyId !== 'string') throw new Error('No Story ID in URL');

    const { showAnswersImmediately, isCompleted } = useAtomValue(
        storiesAtomFamily(storyId)
    );

    return (
        <>
            <Initializer_CLIENT_ONLY />
            <PlayCardsListProvider
                {...{
                    showAnswersImmediately,
                    isCompleted,
                    storyId
                }}>
                <main className='mainContainer'>
                    <PageTitle />
                    <Results />
                    <CardsList />
                    <FinishButton />
                </main>
            </PlayCardsListProvider>
        </>
    );
}
