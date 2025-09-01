"use client";
import { AddCollectionPageDBContextProvider } from "@/app/lib/db/ObservableCreateCollectionDB/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import Header from "./Header";
import RenderCards from "./RenderCards";
import Instruments from "./Instruments";
import { useAddCardOnShortcut } from "./RenderCards/client";
import {
  useClearJotaiOnExit,
  useInitAllCards,
} from "@/app/lib/db/ObservableCreateCollectionDB";

export default function Page() {
  console.log("renderPage");

  return (
    <MainPageDBContextProvider>
      <AddCollectionPageDBContextProvider>
        <main className="w-full p-8 flex flex-col gap-5 min-h-full">
          <Initializers />
          <Header />
          <Instruments />
          <RenderCards />
        </main>
      </AddCollectionPageDBContextProvider>
    </MainPageDBContextProvider>
  );
}

function Initializers() {
  useAddCardOnShortcut();
  useInitAllCards();
  useClearJotaiOnExit();
  return <></>;
}
