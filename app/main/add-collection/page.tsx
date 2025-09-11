'use client';

import MainPageDBContextProvider from '@/app/lib/db/Main/provider';
import { CollectionTitleContextProvider } from '@/app/main/add-collection/CollectionTitleContext';
import CardsContextProvider from '@/app/main/add-collection/CardsContext/provider';
import { useAddCardOnShortcut } from '@/app/main/add-collection/RenderCards/client';
import Header from '@/app/main/add-collection/Header';
import Instruments from '@/app/main/add-collection/Instruments';
import RenderCards from '@/app/main/add-collection/RenderCards';
import AddCardButton from '@/app/main/add-collection/AddCardButton';

export default function handleLoading() {
        return (
                <MainPageDBContextProvider>
                        <CollectionTitleContextProvider>
                                <CardsContextProvider>
                                        <main className='w-full p-8 flex flex-col gap-5 min-h-full'>
                                                <Initializers />
                                                <Header />
                                                <Instruments />
                                                <RenderCards />
                                                <AddCardButton />
                                        </main>
                                </CardsContextProvider>
                        </CollectionTitleContextProvider>
                </MainPageDBContextProvider>
        );
}

function Initializers() {
        useAddCardOnShortcut();
        // useInitAllCards();
        // useClearJotaiOnExit();
        return <></>;
}
