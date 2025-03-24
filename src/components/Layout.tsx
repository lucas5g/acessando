import { Navbar } from "@/components/Navbar"
import { AppProvider } from "@/providers/AppProvider";
import { useState } from "react";

interface Props {
  uri: string;
  fields: Record<string, string>;
  fieldsTable?: Record<string, string>;
  fieldsFilter?: Record<string, string>;
  children: React.ReactNode,
  menus: Record<string, string>
}
export function Layout({ children, uri, fields, fieldsTable, fieldsFilter, menus }: Readonly<Props>) {
  const [search, setSearch] = useState(uri);
  return (
    <>
      <Navbar menus={menus} />
      <main className="p-5 flex flex-col gap-5">
        <AppProvider
          uri={uri}
          fields={fields}
          fieldsTable={fieldsTable ?? fields}
          fieldsFilter={fieldsFilter ?? fields}
          search={search}
          setSearch={setSearch}
        >
          {children}
        </AppProvider>
      </main>
    </>
  )
}