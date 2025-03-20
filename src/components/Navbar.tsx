import { Link } from "react-router"

export function Navbar() {

  const links = {
    '/': 'Home',
    '/memorize': 'Memorize',
    '/pontos': 'Pontos',
  }

  return (
    <nav >
      <ul className="flex bg-gray-700">
        {Object.entries(links).map(([key, value]) => (
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