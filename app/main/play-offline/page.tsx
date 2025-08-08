import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import RenderQuestions from "./RenderQuestions";
import CollectionContextProvider from "./provider";
import HistoryDBContextProvider from "@/app/lib/db/History/provider";

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
        <HistoryDBContextProvider>
          {/* <CollectionContextProvider collectionID={params.id}> */}
          <RenderQuestions />
          {/* </CollectionContextProvider> */}
        </HistoryDBContextProvider>
      </MainPageDBContextProvider>
    </main>
  );
}
