import { Navbar } from "@/components/Navbar"

interface Props {
  children: React.ReactNode
}
export function Layout({ children }: Readonly<Props>) {
  return (
    <>
      <Navbar />
      <main className="p-5 flex flex-col gap-5">
        {children}
      </main>
    </>
  )
}