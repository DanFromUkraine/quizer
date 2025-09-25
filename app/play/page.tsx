import { use } from 'react';
import useHydrateBookIdAtom from '@/src/hooks/jotaiRelated/useHydrateBookIdAtom';

export default async function PlayPage({
        searchParams
}: {
        searchParams: Promise<{ bookId: string | undefined }>;
}) {
        const bookId = use(searchParams).bookId;
        if (typeof bookId !== 'string') throw 'No Book ID in URL';
        useHydrateBookIdAtom({ bookId });

        return <main className='mainContainer'>

        </main>;
}
