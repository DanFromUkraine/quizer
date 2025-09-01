"use client";

import createSimpleContextProviderPair from "@/app/lib/utils/createSimpleContext";
import getContextEnhancedReceiver from "@/app/lib/utils/getContextReceiver";
import { Dispatch, SetStateAction, useState } from "react";

function useInitCollectionTitle() {
  const [collectionTitle, setCollectionTitle] = useState("");

  return { collectionTitle, setCollectionTitle };
}

type CollectionTitle = {
  collectionTitle: string;
  setCollectionTitle: Dispatch<SetStateAction<string>>;
} | null;

export const [CollectionTitleContext, CollectionTitleContextProvider] =
  createSimpleContextProviderPair<CollectionTitle>({
    defaultData: null,
    useGetData: useInitCollectionTitle,
  });

export const useCollectionTitle = getContextEnhancedReceiver({
  contextName: "Collection title",
  Context: CollectionTitleContext,
});
