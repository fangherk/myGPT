import { createContext, useContext } from "react";
import { RootStore } from "../stores/RootStore";

export const RootStoreContext = createContext<RootStore | undefined>(undefined);

export function useRootStore() {
  const context = useContext(RootStoreContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
