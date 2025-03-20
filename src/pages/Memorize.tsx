import { Layout } from "@/components/Layout";

import { Table } from "@/components/Table";
import { Form } from "@/components/Form";
import { useState } from "react";


export function Memorize() {

  const uri = 'phrases'

  const fields = {
    english: 'English',
    portuguese: 'Portuguese',
  }

  return (
    <Layout fields={fields} uri={uri}>
      <Form />
      <Table />
    </Layout>
  )
}