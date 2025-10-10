'use client';

import { useHydrateAtoms } from 'jotai/utils';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import PageTitle from '@/src/components/play_page/Title';
import CardsList from '@/src/components/play_page/CardsList';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import FinishButton from '@/src/components/play_page/FinishButton';
import { useSearchParams } from 'next/navigation';

export default function PlayPage() {
        const searchParams = useSearchParams();
        const storyId = searchParams.get('storyId');
        if (typeof storyId !== 'string') throw new Error('No Story ID in URL');
        useHydrateAtoms([[currentStoryIdAtom, storyId]]);

        return (
                <>
                        <Initializer_CLIENT_ONLY />
                        <main className='mainContainer'>
                                <PageTitle />
                                <CardsList />
                                <FinishButton />
                        </main>
                </>
        );
}
