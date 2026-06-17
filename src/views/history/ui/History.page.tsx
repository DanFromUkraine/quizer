'use client';

import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import Title from './Title';
import SortTools from './SortTools';
import ByBookStoriesList from './ByBookStoriesList';

export function HistoryPage() {
    return (
        <>
            <Initializer_CLIENT_ONLY />
            <main className='mainContainer'>
                <Title />
                <SortTools />
                <ByBookStoriesList />
            </main>
        </>
    );
}
