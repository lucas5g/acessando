import { Form } from "@/components/Form"
import { Layout } from "@/components/Layout"
import { Table } from "@/components/Table"

export function Server(){

  const fields = {
    name: 'Nome',
    masp: 'MASP',
  }

  return (
   
    <Layout fields={fields} uri={'servers'} >
      <Form />
      <Table />
    </Layout>
   
  )
}