'use client';
// import { AddCollectionPageDBContextProvider } from "@/app/lib/db/ObservableCreateCollectionDB/provider";
import MainPageDBContextProvider from '@/app/lib/db/MainPageDB/provider';
import Header from './Header';
import RenderCards from './RenderCards';
import Instruments from './Instruments';
import { useAddCardOnShortcut } from './RenderCards/client';
import '@/app/lib/db/ObservableCreateCollectionDB';
import { ObservableCreateCollectioProviderDB } from '@/app/lib/db/ObservableCreateCollectionDB/provider';
import { CollectionTitleContextProvider } from './CollectionTitleContext';
import CardsContextProvider from './CardsContext/provider';
import AddCardButton from './AddCardButton';

export default function Page() {
        console.log('renderPage');

        return (
                <MainPageDBContextProvider>
                        <CollectionTitleContextProvider>
                                <CardsContextProvider>
                                        <ObservableCreateCollectioProviderDB>
                                                <main className='w-full p-8 flex flex-col gap-5 min-h-full'>
                                                        <Initializers />
                                                        <Header />
                                                        <Instruments />
                                                        <RenderCards />
                                                        <AddCardButton />
                                                </main>
                                        </ObservableCreateCollectioProviderDB>
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
