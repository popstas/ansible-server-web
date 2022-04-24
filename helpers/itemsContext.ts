import { createAppContext } from "helpers/createContext";
import { ItemTypeShort } from "helpers/types";

export const [useItems, ItemsProvider] =
  createAppContext<ItemTypeShort[]>("ItemsContext");
