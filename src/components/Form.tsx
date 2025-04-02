import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "./Card";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAppContext } from "@/providers/AppProvider";
import { useRef } from "react";


export function Form() {

  const { uri, search, fields } = useAppContext()
  const formRef = useRef<HTMLFormElement>(null);
  console.log({uri})

  const queryClient = useQueryClient()

  const { mutateAsync: createPhraseFn, isPending } = useMutation({
    mutationFn: createPhrase,
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

  async function createPhrase({ english, tag }: { english: string, tag: string }) {


    const res = await fetch(uri, {
      method: 'POST',
      body: JSON.stringify({
        english,
        tag
      })
    })

    formRef.current?.reset()
    return res.json()
    // as Promise<PhraseInterface>
  }

  async function handleCreatePhrase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const english = formData.get('english') as string
    const tag = formData.get('tag') as string

    createPhraseFn({ english, tag })

  }

  return (

    <Card >
      <h2>Create</h2>
      <form
        ref={formRef}
        onSubmit={handleCreatePhrase}
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