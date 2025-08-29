import HistoryDBContextProvider from "@/app/lib/db/History/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import CollectionContextProvider from "@/app/main/play-offline/Provider";

export default async function ViewSearchParams({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="w-full p-8 flex flex-col gap-2 items-center">
      <MainPageDBContextProvider>
        <HistoryDBContextProvider collectionID={params.id}>
          <CollectionContextProvider>
            <p>hello, world</p>
          </CollectionContextProvider>
        </HistoryDBContextProvider>
      </MainPageDBContextProvider>
    </main>
  );
}
