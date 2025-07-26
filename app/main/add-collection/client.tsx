"use client";
import { AddCollectionPageDBContextProvider } from "@/app/lib/db/AddCollectionPageDB/provider";
import MainPageDBContextProvider from "@/app/lib/db/MainPageDB/provider";
import Header from "./Header";
import RenderCards from "./RenderCards";
import { PendingStoreContextProvider } from "@/app/lib/wrappers/PendingStoreProvider";
import { AllPendingReadyContextProvider } from "@/app/lib/wrappers/AllPendingReadyWrapper";
import { FlushSignalContextWrapper } from "@/app/lib/wrappers/FlushSignalWrapper";

export default function Page() {
  return (
    <FlushSignalContextWrapper>
      <MainPageDBContextProvider>
        <PendingStoreContextProvider>
          <AllPendingReadyContextProvider>
            <AddCollectionPageDBContextProvider>
              <main className="w-full p-8 flex flex-col min-h-full">
                <Header />
                {/* <RenderCards /> */}
              </main>
            </AddCollectionPageDBContextProvider>
          </AllPendingReadyContextProvider>
        </PendingStoreContextProvider>
      </MainPageDBContextProvider>
    </FlushSignalContextWrapper>
  );
}
