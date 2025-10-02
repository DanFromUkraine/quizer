'use client';

import Initializer_CLIENT_ONLY from '@/src/components/initializers/InitMainDbAtoms';
import Title from '@/src/components/history_page/Title';
import SortTools from '@/src/components/history_page/SortTools';
import ByBookStoriesList from '@/src/components/history_page/ByBookStoriesList';

export default function History() {
        return (
                <>
                        <Initializer_CLIENT_ONLY />
                        <main className="mainContainer">
                                <Title />
                                <SortTools />
                                <ByBookStoriesList />
                        </main>
                </>
        );
}
