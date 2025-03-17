import { Card } from "@/components/Card";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import AudioPlayer from "@/components/AudioPlayer";


interface PhraseInterface {
  id: number,
  english: string,
  tag: string
}

export function Memorize() {

  const [phrases, setPhrases] = useState<PhraseInterface[]>([])

  useEffect(() => {
    fetch('/phrases')
      .then(res => res.json())
      .then(data => setPhrases(data))
  }, [])

  function createPhrase(event: any) {
    event.preventDefault()

    fetch('/phrases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        english: event.target.english.value,
        tag: event.target.tag.value
      })
    })
      .then(res => res.json())
      .then(data => {
        setPhrases([data, ...phrases])
        event.target.reset()

      })
  }


  function findAllPhrase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = Object.fromEntries(formData)

    const tag = data.searchTag

    fetch(`/phrases?tag=${tag}`)
      .then(res => res.json())
      .then(data => setPhrases(data))

  }

  return (
    <Layout>
      <h1>Memorize</h1>

      <Card >
        <h2>Create</h2>
        <form
          onSubmit={createPhrase}
          className="flex flex-col gap-2"
        >
          <Input name="english" placeholder="English" />
          <Input name="tag" placeholder="Tag" />
          <Button type="submit">Save</Button>

        </form>
      </Card>


      <Card>
        <h2>List</h2>
        <form 
          onSubmit={findAllPhrase}
          className="flex gap-2"
          >
          <Input name="searchTag" placeholder="Search by Tag" showLabel={false} />
          <Button type="submit">Search</Button>
        </form>
        {phrases.length === 0 &&
          <p className="italic p-5">No phrases found. :(</p>
        }
        {phrases.length > 0 &&
          <table className="w-full">
            <thead>
              <tr className="text-left ">
                <th>English/Portuguese</th>
                <th>Audio</th>
              </tr>
            </thead>
            <tbody>
              {phrases.map((phrase: any) => (
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