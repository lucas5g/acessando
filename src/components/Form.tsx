import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "./Card";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAppContext } from "@/providers/AppProvider";


export function Form(){

  const { uri, search, fields} = useAppContext()

  const queryClient = useQueryClient()

  const { mutateAsync: createPhraseFn, isPending } = useMutation({
    mutationFn: createPhrase,
    onSuccess: (res) => {
      queryClient.setQueryData([uri, search ], (data: any[]) => {
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

    return res.json() 
    // as Promise<PhraseInterface>
  }

  async function handleCreatePhrase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const english = formData.get('english') as string
    const tag = formData.get('tag') as string

    createPhraseFn({ english, tag })

    event.currentTarget.reset()
  }

  return (

    <Card >
      <h2>Create</h2>
      <form
        onSubmit={handleCreatePhrase}
        className="flex flex-col gap-2"
      >
        {Object.entries(fields).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            placeholder={value}
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