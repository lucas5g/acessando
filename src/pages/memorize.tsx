import { Layout } from "@/components/Layout";

import { Table } from "@/components/Table";
import { Form } from "@/components/Form";


export function Memorize() {

  const uri = '/phrases'

  const fields = {
    english: 'English',
    portuguese: 'Portuguese',
  }

  return (
    <Layout>
      <Form
        fields={fields}
      />
      <Table
        uri={uri}
        fields={fields}
      />
    </Layout>
  )
}