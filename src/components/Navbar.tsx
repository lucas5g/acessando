import { Link, useLocation } from "react-router"
import { MenuInterface } from "./GenerateRoutes"
import clsx from "clsx";
import { useEffect } from "react";

interface Props {
  menus:MenuInterface[]
}
export function Navbar({ menus }: Readonly<Props>) {
  const location = useLocation();

  useEffect(() => {
    document.title = location.pathname.split('/').slice(1).join(' > ').toUpperCase();
  }, [location])


  return (
    <nav >
      <ul className="flex bg-gray-700">
        {menus.map(menu => (
          <Link
            key={menu.path}
            to={menu.path}>
            <li
              className={clsx('w-24 py-4 text-center hover:bg-gray-800', {
                'bg-gray-800 font-bold border-t': location.pathname === menu.path
              })}
            >
              {menu.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}