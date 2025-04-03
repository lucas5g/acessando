interface Props{
  title: string
}
export function Header({ title }: Readonly<Props>) {
  return (
    <header className="border-b border-gray-400">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  )
}