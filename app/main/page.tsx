"use client";

import MainPageDBContextProvider from "../lib/db/MainPageDB/provider";
import Header from "./Header";
import RenderCollections from "./RenderCollections";

export default function page() {
  return (
    <main className="flex flex-col w-full px-8">
      <Header />
      <MainPageDBContextProvider>
        <RenderCollections />
      </MainPageDBContextProvider>
    </main>
  );
}
