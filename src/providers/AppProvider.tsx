import { createContext, useContext, useMemo, useState } from "react";

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
interface AppProviderProps  {
  uri: string;
  fields: Record<string, string>;
  fieldsTable?: Record<string, string>;
  fieldsFilter?: Record<string, string>;
  children: React.ReactNode;


}

export function AppProvider(props: Readonly<AppProviderProps>) {

  const [search, setSearch] = useState(props.uri);

  const value = useMemo(() => ({
    fields: props.fields,
    fieldsTable: props.fieldsTable ?? props.fields,
    fieldsFilter: props.fieldsFilter ?? props.fields,
    uri: props.uri,
    search,
    setSearch
  }), [props.fields, props.fieldsTable, props.fieldsFilter, props.uri, search]);

    
  return (
    <AppContext.Provider 
      value={value} 
      >
      {props.children}
    </AppContext.Provider>
  )
}