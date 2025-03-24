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
    englishPortuguese: 'English/Portuguese',
    audio: 'Audio',
  }

  const fieldsFilter = {
    tag: 'Tag',
    english: 'English',
    portuguese: 'Portuguese',
  }

  const menus = {
    '/memorize': 'Memorize',
  }

  return (
    <Layout
      fields={fields}
      fieldsTable={fieldsTable}
      fieldsFilter={fieldsFilter}
      uri={uri}
      menus={menus}
    >
      <Form />
      <Table />
    </Layout>
  )
}