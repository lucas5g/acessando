import { Navbar } from "@/components/Navbar"
import { AppProvider } from "@/providers/AppProvider";
import { useState } from "react";

interface Props {
  uri: string;
  fields: Record<string, string>;
  fieldsTable?: Record<string, string>;
  children: React.ReactNode
}
export function Layout({ children, uri, fields, fieldsTable }: Readonly<Props>) {
  const [search, setSearch] = useState(uri);
  return (
    <>
      <Navbar />
      <main className="p-5 flex flex-col gap-5">
        <AppProvider 
          uri={uri}
          fields={fields}
          fieldsTable={fieldsTable ?? fields}
          search={search}
          setSearch={setSearch}
          >
          {children}
        </AppProvider>
      </main>
    </>
  )
}