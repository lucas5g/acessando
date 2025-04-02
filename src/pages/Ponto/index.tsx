import { MenuInterface } from "@/components/GenerateRoutes";
import { Layout } from "@/components/Layout";
import { Server } from "@/pages/Ponto/Server";

export const pontosMenus:MenuInterface[] = [
  {
    path: '/pontos',
    label: 'Ponto',
    component: Ponto
  },
  {
    path: '/pontos/servidores',
    label: 'Servidores',
    component: Server
  }
]

export function Ponto() {
  return (
    <Layout menus={pontosMenus}>
      {/* <Form />  */}
      <p>gerenciar pontos</p>
    </Layout>
  )
}