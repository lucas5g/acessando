import { Card } from "@/components/Card";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import AudioPlayer from "@/components/AudioPlayer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


interface PhraseInterface {
  id: number,
  english: string,
  portuguese: string
  tag: string
}

export function Memorize() {

  const queryClient = useQueryClient()
  
  const { data, isLoading } = useQuery({
    queryKey: ['phrases'],
    queryFn: () => fetch('/phrases').then(res => res.json()) as Promise<PhraseInterface[]>,
  })


  const { mutateAsync: createPhraseFn, isPending } = useMutation({
    mutationFn: createPhrase,
    onSuccess: (res) => {
      queryClient.setQueryData(['phrases'], (data: PhraseInterface[]) => {
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

    return res.json() as Promise<PhraseInterface>
  }

  async function handleCreatePhrase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const english = formData.get('english') as string
    const tag = formData.get('tag') as string

    createPhraseFn({ english, tag })

    event.currentTarget.reset()
  }


  if (isLoading) return <p>Loading...</p>

  return (
    <Layout>
      <h1>Memorize</h1>

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

      <Card>
        <h2>List</h2>
        <form
          // onSubmit={findAllPhrase}
          className="flex gap-2"
        >
          <Input name="searchTag" placeholder="Search by Tag" showLabel={false} />
          <Button type="submit">Search</Button>
        </form>

        <table className="w-full">
          <thead>
            <tr className="text-left ">
              <th>English/Portuguese</th>
              <th>Audio</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(phrase => (
              <tr
                key={phrase.id}
                className="border-b last:border-0 hover:bg-gray-800 transition "
              >
                <td className="py-4 pl-2">
                  {phrase.english} <br />
                  <i>
                    {phrase.portuguese}
                  </i>
                </td>
                <td>
                  <AudioPlayer phraseId={phrase.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card >
    </Layout>
  )
}