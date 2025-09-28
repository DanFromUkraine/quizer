'use client';

import { use } from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { currentStoryIdAtom } from '@/src/jotai/idManagers';
import PageTitle from '@/src/components/play_page/Title';
import CardsList from '@/src/components/play_page/CardsList';
import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import FinishButton from '@/src/components/play_page/FinishButton';

export default function PlayPage({
        searchParams
}: {
        searchParams: Promise<{ storyId: string | undefined }>;
}) {
        const storyId = use(searchParams).storyId;
        if (typeof storyId !== 'string') throw 'No Book ID in URL';
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
