import HistoryDBContextProvider from '@/app/lib/db/History/provider';
import MainPageDBContextProvider from '@/app/lib/db/Main/provider';
import RenderQuestions from './RenderQuestions';
import SubmitButton from './SubmitButton';
import CollectionContextProvider from '@/app/books/play-offline/CollectionDataContext/provider';
import IdContextProvider from '@/app/lib/assessmentModeComponents/IdContext/provider';

export default async function page({
        searchParams
}: {
        searchParams: Promise<{ id: string | undefined }>;
}) {
        const params = await searchParams;

        if (typeof params.id !== 'string') throw 'No Book ID in URL';

        return (
                <main className='w-full p-8 flex flex-col gap-2 items-center'>
                        <MainPageDBContextProvider>
                                <IdContextProvider
                                        id={new URLSearchParams(
                                                params.id
                                        ).toString()}>
                                        <HistoryDBContextProvider>
                                                <CollectionContextProvider>
                                                        <RenderQuestions />
                                                        <SubmitButton />
                                                </CollectionContextProvider>
                                        </HistoryDBContextProvider>
                                </IdContextProvider>
                        </MainPageDBContextProvider>
                </main>
        );
}
