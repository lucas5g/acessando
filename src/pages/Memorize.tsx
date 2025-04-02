import { Layout } from "@/components/Layout";

import { Table } from "@/components/Table";
import { Form } from "@/components/Form";
import { MenuInterface } from "@/components/GenerateRoutes";
import { AppProvider } from "@/providers/AppProvider";

export function Memorize() {
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

  const memorizeMenus: MenuInterface[] = [
    {
      path: '/memorize',
      label: 'Memorize',
      component: Memorize
    }
  ]

  return (
    <Layout menus={memorizeMenus} >
      
      <AppProvider
        fields={fields}
        fieldsTable={fieldsTable}
        fieldsFilter={fieldsFilter}
        uri={'phrases'}
        >
        <Form />
        <Table />
      </AppProvider>
    </Layout>
  )
}