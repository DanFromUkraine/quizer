'use client';

import Header from './Header';
import RenderCollections from './RenderCollections';
import dynamic from 'next/dynamic';

const Initializers_CLIENT_ONLY = dynamic(
        () => import('../lib/components/Initializers/InitMainDbAtoms'),
        { ssr: false }
);

export default function MainPage() {
        return (
                <>
                        <Initializers_CLIENT_ONLY />

                        <main className='flex flex-col w-full px-8'>
                                <Header />
                                <RenderCollections />
                        </main>
                </>
        );
}
