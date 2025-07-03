"use client";
import { AddCollectionPageDBContextProvider } from "@/app/lib/db/AddCollectionPageDB/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import Header from "./Header";
import RenderCards from "./RenderCards";

export default function Page() {
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

