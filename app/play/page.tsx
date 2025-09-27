"use client"

import { use } from 'react';
import useHydrateBookIdAtom from '@/src/hooks/jotaiRelated/useHydrateBookIdAtom';

export default function PlayPage({
        searchParams
}: {
        searchParams: Promise<{ storyId: string | undefined }>;
}) {
        const storyId = use(searchParams).storyId;
        if (typeof storyId !== 'string') throw 'No Book ID in URL';
        // useHydrateBookIdAtom({ storyId });

        return <main className='mainContainer'>

        </main>;
}
