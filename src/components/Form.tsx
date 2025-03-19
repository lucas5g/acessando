import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "./Card";
import { Input } from "./Input";
import { Button } from "./Button";

interface Props{
  fields: object
}

export function Form(props: Props){

  const queryClient = useQueryClient()

  const { mutateAsync: createPhraseFn, isPending } = useMutation({
    mutationFn: createPhrase,
    onSuccess: (res) => {
      // queryClient.setQueryData(['phrases'], (data: PhraseInterface[]) => {
      queryClient.setQueryData(['phrases'], (data: any) => {

        return [
          res,
          ...data,
        ]
      })
    }
  })

  async function createPhrase({ english, tag }: { english: string, tag: string }) {

    const res = await fetch('/phrases', {
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
        <Input name="english" placeholder="English" />
        <Input name="tag" placeholder="Tag" />
        <Button
          disabled={isPending}
          type="submit">
          Save
        </Button>

      </form>
    </Card>

  )
}