import { Form } from "@/components/Form"
import { Layout } from "@/components/Layout"
import { Table } from "@/components/Table"
import { pontosMenus } from "@/pages/Ponto/index"
import { AppProvider } from "@/providers/AppProvider"

export function Server() {

  const fields = {
    name: 'Nome',
    masp: 'MASP',
  }

  return (

    <Layout
      menus={pontosMenus}
    >
      <AppProvider
        uri={'../servers'}
        fields={fields}
        >
        <Form />
        <Table />
      </AppProvider>
    </Layout>

  )
}