"use client";
import { AddCollectionPageDBContextProvider } from "@/app/lib/db/AddCollectionPageDB/provider";
import Header from "./Header";
import RenderCards from "./RenderCards";
import { useInitAllCardsFromDB } from "@/app/lib/db/AddCollectionPageDB";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";

export default function Page() {
  useInitAllCardsFromDB();

  return (
    <MainPageDBContextProvider>
      <AddCollectionPageDBContextProvider>
        <main className="w-full p-8 flex flex-col min-h-full">
          <Header />
          <RenderCards />
        </main>
      </AddCollectionPageDBContextProvider>
    </MainPageDBContextProvider>
  );
}
