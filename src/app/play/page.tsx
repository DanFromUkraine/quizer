import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type PageProps = {
    searchParams?: Promise<{
        storyId?: string;
    }>;
};

export default async function Page({ searchParams }: PageProps) {
    const storyId = (await searchParams)?.storyId;

    if (typeof storyId !== 'string') {
        return <div>loading...</div>;
    }

    const { PlayPage, PlayPageFallback } = await import('@/src/views/play');

    return (
        <Suspense fallback={<PlayPageFallback />}>
            <PlayPage storyId={storyId} />
        </Suspense>
    );
}
