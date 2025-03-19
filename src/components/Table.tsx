import { keepPreviousData, useQuery } from "@tanstack/react-query";
import AudioPlayer from "./AudioPlayer";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";

interface Props {
  uri: string
  fields: object
  search: string 
  setSearch: (search: string) => void
}

export function Table({ uri, search, setSearch  }: Readonly<Props>) {


  const { data, isLoading, isFetched } = useQuery({
    queryKey: [uri, search],
    queryFn: () => fetch(search).then(res => res.json()),
    placeholderData: keepPreviousData
  })


  if (isLoading) return <p>Loading...</p>
  return (

    <Card>
      <h2>List</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const tag = event.currentTarget.searchTag.value

          if (!tag) {
            setSearch('/phrases')
            return
          }

          setSearch(`/phrases?search=${tag}`)
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
  )
}