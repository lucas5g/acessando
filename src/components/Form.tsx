import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "./Card";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAppContext } from "@/providers/AppProvider";
import { useRef } from "react";
import { Header } from "./Header";


export function Form() {

  const { uri, search, fields } = useAppContext()
  const formRef = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient()

  const { mutateAsync: createFn, isPending } = useMutation({
    mutationFn: create,
    onSuccess: (res) => {
      queryClient.setQueryData([uri, search], (data: any[]) => {

        if(uri === 'phrases') {
          return  [
            {
              englishPortuguese: `${res.english} <br/> ${res.portuguese}`,
              id: res.id
            },
            ...data
          ]
        }

        return [
          res,
          ...data,
        ]
      })
    }
  })

  async function create(data: any) {

    const res = await fetch(uri, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    formRef.current?.reset()
    return res.json()
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = Object.fromEntries(formData)

    createFn(data)

  }

  return (

    <Card>
      <Header title="Create" />
      <form
        ref={formRef}
        onSubmit={handleCreate}
        className="flex flex-col gap-2"
      >
        {Object.entries(fields).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            placeholder={value}
            disabled={isPending}
          />
        ))}

        <Button
          disabled={isPending}
          type="submit">
          Save
        </Button>

      </form>
    </Card>

  )
}