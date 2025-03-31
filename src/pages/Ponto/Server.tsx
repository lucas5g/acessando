import { Form } from "@/components/Form"
import { Layout } from "@/components/Layout"
import { Table } from "@/components/Table"
import { pontosMenus } from "@/pages/Ponto/index"

export function Server() {

  const fields = {
    name: 'Nome',
    masp: 'MASP',
  }

  return (

    <Layout
      menus={pontosMenus}
    >
      {/* <Form />
      <Table /> */}
      <p>lista de servidores</p>
    </Layout>

  )
}