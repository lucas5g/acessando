import { Layout } from "@/components/Layout";

import { Table } from "@/components/Table";
import { Form } from "@/components/Form";
import { m } from "node_modules/react-router/dist/development/fog-of-war-Da8gpnoZ.mjs";


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

  const menus = {
    '/memorize': 'Memorize',
  }

  return (
    <Layout 
      fields={fields} 
      fieldsTable={fieldsTable}
      uri={uri}
      menus={menus}
      >
      <Form />
      <Table />
    </Layout>
  )
}