import { Link } from "react-router"
import { MenuInterface } from "./GenerateRoutes"

interface Props {
  menus:MenuInterface[]
}
export function Navbar({ menus }: Readonly<Props>) {
  return (
    <nav >
      <ul className="flex bg-gray-700">
        {menus.map(menu => (
          <Link
            key={menu.path}
            to={menu.path}>
            <li
              className='w-24 py-4 text-center hover:bg-gray-800'
            >
              {menu.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}