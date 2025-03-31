import { Form } from "@/components/Form";
import { Layout } from "@/components/Layout";
import { Server } from "@/pages/Ponto/Server";
import { AppProvider } from "@/providers/AppProvider";
import { Route } from "react-router";

export const pontosMenus = {
  '/pontos': 'Pontos',
  '/pontos/servidores': 'Servidores',
}


export function Ponto() {

  console.log({ pontosMenus })
  return (
    <Layout menus={pontosMenus}>
      {/* <Form />  */}
      <p>gerenciar pontos</p>
    </Layout>
  )
}