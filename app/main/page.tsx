import { MainPageDBContextProvider } from "../lib/db/mainPageDB";
import Header from "./Header";
import RenderCollections from "./RenderCollections";

export default function page() {
  return (
    <MainPageDBContextProvider>
      <main className="flex flex-col">
        <Header />
        <RenderCollections />
      </main>
    </MainPageDBContextProvider>
  );
}
