import { createContext, useContext } from "react";
import { UserStore } from "../stores/UserStore";

export const UserStoreContext = createContext<UserStore | undefined>(undefined);

export function useUserStore() {
  const context = useContext(UserStoreContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
