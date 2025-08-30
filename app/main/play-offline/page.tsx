import HistoryDBContextProvider from "@/app/lib/db/History/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import RenderQuestions from "./RenderQuestions";
import CollectionContextProvider from "./Provider";
import SubmitButton from "./SubmitButton";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ id: string | undefined }>;
}) {
  const params = await searchParams;

  if (typeof params.id !== "string") throw "No Collection ID in URL";

  return (
    <main className="w-full p-8 flex flex-col gap-2 items-center">
      <MainPageDBContextProvider>
        <HistoryDBContextProvider
          collectionID={new URLSearchParams(params.id).toString()}
        >
          <CollectionContextProvider>
            <RenderQuestions />
            <SubmitButton />
          </CollectionContextProvider>
        </HistoryDBContextProvider>
      </MainPageDBContextProvider>
    </main>
  );
}
