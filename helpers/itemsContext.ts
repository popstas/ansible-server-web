import { createAppContext } from "./createContext";
import { ItemTypeShort } from "./types";

export const [useItems, ItemsProvider] =
  createAppContext<ItemTypeShort[]>("ItemsContext");
