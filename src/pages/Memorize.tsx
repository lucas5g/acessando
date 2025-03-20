import { Layout } from "@/components/Layout";

import { Table } from "@/components/Table";
import { Form } from "@/components/Form";


export function Memorize() {

  const uri = 'phrases'

  const fields = {
    english: 'English',
    tag: 'Tag',
  }

  const fieldsTable = {
    english: 'English',
    portuguese: 'Portuguese',
    audio: 'Audio',
  }

  return (
    <Layout 
      fields={fields} 
      fieldsTable={fieldsTable}
      uri={uri}
      >
      <Form />
      <Table />
    </Layout>
  )
}