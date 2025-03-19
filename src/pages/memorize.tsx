import { Layout } from "@/components/Layout";

import { Table } from "@/components/Table";
import { Form } from "@/components/Form";
import { useState } from "react";


export function Memorize() {

  const uri = 'phrases'
  const [search, setSearch] = useState(uri);


  const fields = {
    english: 'English',
    portuguese: 'Portuguese',
  }

  return (
    <Layout>
      <Form
        uri={uri}
        fields={fields}
        search={search}
      />
      <Table
        uri={uri}
        fields={fields}
        search={search}
        setSearch={setSearch}
      />
    </Layout>
  )
}