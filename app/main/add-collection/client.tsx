"use client";
import { AddCollectionPageDBContextProvider } from "@/app/lib/db/AddCollectionPageDB/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import Header from "./Header";
import RenderCards from "./RenderCards";
import Instruments from "./Instruments";

export default function Page() {
  return (
    <MainPageDBContextProvider>
      <AddCollectionPageDBContextProvider>
        <main className="w-full p-8 flex flex-col gap-5 min-h-full">
          <Header />
          <Instruments />
          <RenderCards />
        </main>
      </AddCollectionPageDBContextProvider>
    </MainPageDBContextProvider>
  );
}
