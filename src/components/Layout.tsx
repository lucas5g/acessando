import { Navbar } from "@/components/Navbar"

import { MenuInterface } from "./GenerateRoutes";

interface Props {
  
  children: React.ReactNode,
  menus: MenuInterface[]
}
export function Layout({ menus, children }: Readonly<Props>) {
  return (
    <>
      <Navbar menus={menus} />
      <main className="p-5 flex flex-col gap-5">
       
        {children}
      </main>
    </>
  )
}