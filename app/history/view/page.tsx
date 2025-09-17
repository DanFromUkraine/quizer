import HistoryDBContextProvider from '@/app/lib/db/History/provider';
import MainPageDBContextProvider from '@/app/lib/db/Main/provider';
import CollectionDataCompleteContextProvider from './CollectionDataContext/provider';
import RenderQuestions from './RenderQuestions';
import IdContextProvider from '@/app/lib/assessmentModeComponents/IdContext/provider';

export default async function ViewSearchParams({
        searchParams
}: {
        searchParams: Promise<{ id: string }>;
}) {
        const params = await searchParams;

        console.log({ params });

        return (
                <main className='w-full p-8 flex flex-col gap-2 items-center'>
                        <MainPageDBContextProvider>
                                <IdContextProvider
                                        id={new URLSearchParams(
                                                params.id
                                        ).toString()}>
                                        <HistoryDBContextProvider>
                                                <CollectionDataCompleteContextProvider>
                                                        <RenderQuestions />
                                                </CollectionDataCompleteContextProvider>
                                        </HistoryDBContextProvider>
                                </IdContextProvider>
                        </MainPageDBContextProvider>
                </main>
        );
}
