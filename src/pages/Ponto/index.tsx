import { Form } from "@/components/Form";
import { Layout } from "@/components/Layout";
import { Server } from "@/pages/Ponto/Server";
import { AppProvider } from "@/providers/AppProvider";
import { Route } from "react-router";

export const pontosMenus = {
  '/pontos': 'Pontos',
  '/pontos/servidores': 'Servidores',
}

export const pontosRoutes = [
  <Route key={'/pontos'} path='/pontos' element={<Ponto />} />,
  <Route key={'/pontos/servidores'} path='/pontos/servidores' element={<Server />} />
]



export function Ponto() {

  console.log({ pontosMenus })
  return (
    <Layout menus={pontosMenus}>
      {/* <Form />  */}
      <p>gerenciar pontos</p>
    </Layout>
  )
}