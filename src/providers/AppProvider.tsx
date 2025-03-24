import { createContext, useContext } from "react";

interface AppContextProps {
  uri: string;
  fields: Record<string, string>;
  fieldsTable: Record<string, string>;
  fieldsFilter: Record<string, string>;
  search: string;
  setSearch: (value: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
}
interface AppProviderProps extends AppContextProps {
  children: React.ReactNode;
}

export function AppProvider(props: Readonly<AppProviderProps>) {

  return (
    <AppContext.Provider value={props}>
      {props.children}
    </AppContext.Provider>
  )
}