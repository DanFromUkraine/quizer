'use client';

import { useAtomValue } from 'jotai';
import PageTitle from '@/src/components/play_page/Title';
import CardsList from '@/src/components/play_page/CardsList';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import FinishButton from '@/src/components/play_page/FinishButton';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';
import Results from '@/src/components/play_page/Results';
import { PlayCardsListProvider } from '../model/play-mode-props';

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
