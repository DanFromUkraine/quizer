"use client";

import { createContext } from "react";
import getContextEnhancedReceiver from "../../utils/getContextReceiver";

export const IdContext = createContext<string>("some string");

export const useIdContext = getContextEnhancedReceiver({
  Context: IdContext,
  contextName: "ID Context",
});
