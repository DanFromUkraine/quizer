import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type PageProps = {
    searchParams?: Promise<{
        bookId?: string;
    }>;
};

export default async function Page({ searchParams }: PageProps) {
    const bookId = (await searchParams)?.bookId;

    if (typeof bookId !== 'string') {
        return <div>loading...</div>;
    }

    const { EditBookPage, EditBookPageFallback } = await import(
        '@/src/views/edit'
    );

    return (
        <Suspense fallback={<EditBookPageFallback />}>
            <EditBookPage bookId={bookId} />
        </Suspense>
    );
}
