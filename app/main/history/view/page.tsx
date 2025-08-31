import CollectionContextProvider from "@/app/main/play-offline/CollectionDataContext/provider";
import RenderQuestions from "@/app/lib/assessmentModeComponents/RenderQuestions";
import HistoryDBContextProvider from "@/app/lib/db/History/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";

export default async function ViewSearchParams({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;

  console.log({ params });

  return (
    <main className="w-full p-8 flex flex-col gap-2 items-center">
      <MainPageDBContextProvider>
        <HistoryDBContextProvider
          collectionID={new URLSearchParams(params.id).toString()}
        >
          <CollectionContextProvider>
            <RenderQuestions />
          </CollectionContextProvider>
        </HistoryDBContextProvider>
      </MainPageDBContextProvider>
    </main>
  );
}
