"use client";

import { createContext } from "react";
import { Observable } from "../../utils/observableLogic";
import { CreateCollectionDB } from "./types";
import getContextEnhancedReceiver from "../../utils/getContextReceiver";

export const ObservableCreateCollectionDBContext =
  createContext<Observable<CreateCollectionDB> | null>(null);

export const useObservableContext = getContextEnhancedReceiver({
  contextName: "Observable Create Collection Database Context",
  Context: ObservableCreateCollectionDBContext,
});
