import HistoryDBContextProvider from "@/app/lib/db/History/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import RenderQuestions from "./RenderQuestions";
import CollectionContextProvider from "./Provider";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ id: string | undefined }>;
}) {
  const params = await searchParams;

  if (typeof params.id !== "string") throw "No Collection ID in URL";

  return (
    <main className="w-full p-8">
      <MainPageDBContextProvider>
        <HistoryDBContextProvider collectionID={params.id}>
          <CollectionContextProvider>
            <RenderQuestions />
          </CollectionContextProvider>
        </HistoryDBContextProvider>
      </MainPageDBContextProvider>
    </main>
  );
}
