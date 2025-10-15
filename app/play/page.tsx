'use client';

import PageTitle from '@/src/components/play_page/Title';
import CardsList from '@/src/components/play_page/CardsList';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import FinishButton from '@/src/components/play_page/FinishButton';
import { useSearchParams } from 'next/navigation';
import { createPropsProvider } from '@/src/utils/createPropsProvider';
import { useAtomValue } from 'jotai';
import { storiesAtomFamily } from '@/src/jotai/mainAtoms';

interface PlayModeProps {
        showAnswersImmediately: boolean;
        isCompleted: boolean;
        storyId: string;
}
export const {
        Provider: PlayCardsListProvider,
        usePropsContext: usePlayModeProps
} = createPropsProvider<PlayModeProps>('play cards list');

export default function PlayPage() {
        const searchParams = useSearchParams();
        const storyId = searchParams.get('storyId');
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
                                        {/*<Results />*/}
                                        <PageTitle />
                                        <CardsList />
                                        <FinishButton />
                                </main>
                        </PlayCardsListProvider>
                </>
        );
}
