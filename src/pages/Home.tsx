import { Link } from "react-router";
import { Layout } from "../components/Layout";
import { Card } from "@/components/Card";
import { main } from "bun";
import { LinkSimple } from "@phosphor-icons/react";

export function Home() {

  const apps = {
    '/memorize': 'Memorize',
    '/pontos': 'Ponto',
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl">Lista dos Projetos</h1>
      <ol>
        {Object.entries(apps).map(([key, value]) => (
          <Link
            key={key}
            to={key}>
            <li
              className='flex justify-center gap-1 w-30  py-2 text-center rounded hover:bg-gray-800'
            >
              <LinkSimple className="mt-1" />
              {value}
            </li>
          </Link>
        ))}

      </ol>
    </main>
    //  <Layout>
    //    <h1>Home</h1>
    //  </Layout>
  )
}