"use client";
import { AddCollectionPageDBContextProvider } from "@/app/lib/db/addCollectionPageDB";
import Header from "./Header";
import RenderCards from "./RenderCards";

export default function Page() {
  return (
    <AddCollectionPageDBContextProvider>
      <main className="w-full p-8 flex flex-col min-h-full">
        <Header />
        <RenderCards />
      </main>
    </AddCollectionPageDBContextProvider>
  );
}
