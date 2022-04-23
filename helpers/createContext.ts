import { useContext, createContext, Provider } from "react";

type ReturnType<T> = [() => T, Provider<T | undefined>];

export function createAppContext<T>(contextName: string): ReturnType<T> {
  const context = createContext<T | undefined>(undefined);
  context.displayName = contextName;

  const useAppContext = () => {
    const c = useContext(context);
    if (c === undefined) throw new Error(`no context ${contextName}`);
    return c;
  };

  return [useAppContext, context.Provider];
}
