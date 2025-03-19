import { Layout } from "@/components/Layout";

import { useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/Input";
import AudioPlayer from "@/components/AudioPlayer";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";


export function Memorize() {

  const queryClient = useQueryClient()

  const [searchTag, setSearchTag] = useState('/phrases');

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['phrases', searchTag],
    queryFn: () => fetch(searchTag).then(res => res.json()),
    placeholderData: keepPreviousData
  })



  const { mutateAsync: createPhraseFn, isPending } = useMutation({
    mutationFn: createPhrase,
    onSuccess: (res, variables) => {
      queryClient.setQueryData(['phrases', searchTag], (data: any[]) => {
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


  if (isLoading) return <p>Loading...</p>
  return (
    <Layout>

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
          onSubmit={(event) => {
            event.preventDefault()
            const tag = event.currentTarget.searchTag.value

            if (!tag) {
              setSearchTag('/phrases')
              return
            }

            setSearchTag(`/phrases?search=${tag}`)
          }}
          className="flex gap-2"
        >
          <Input
            name="searchTag"
            placeholder="Search by Tag"
            showLabel={false}
            required={false}

          />
          <Button
            type="submit"
            disabled={!isFetched}
          >
            Search
          </Button>
        </form>

        {data?.length === 0 &&
          <h2 className="text-2xl text-center my-10">Nada encontrado :(</h2>
        }

        {data.length > 0 &&

          <table className="w-full">
            <thead>
              <tr className="text-left ">
                <th>English/Portuguese</th>
                <th>Audio</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((phrase: any) => (
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
        }
      </Card >
    </Layout>
  )
}