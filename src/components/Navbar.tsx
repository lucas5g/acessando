import { Link } from "react-router"

interface Props {
  menus: Record<string, string>
}
export function Navbar({ menus }: Readonly<Props>) {
  console.log({ menus })
  return (
    <nav >
      <ul className="flex bg-gray-700">
        {Object.entries(menus).map(([key, value]) => (
          <Link
            key={key}
            to={key}>
            <li
              className='w-24 py-4 text-center hover:bg-gray-800'
            >
              {value}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}