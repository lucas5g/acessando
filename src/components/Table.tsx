import { keepPreviousData, useQuery } from "@tanstack/react-query";
import AudioPlayer from "./AudioPlayer";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { useState } from "react";

export function Table() {

  const [searchTag, setSearchTag] = useState('/phrases');

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['phrases', searchTag],
    queryFn: () => fetch(searchTag).then(res => res.json()),
    placeholderData: keepPreviousData
  })


  if (isLoading) return <p>Loading...</p>

  return (

    <Card>
      <h2>List</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setSearchTag(`/phrases?tag=${event.currentTarget.searchTag.value}`)
        }}
        className="flex gap-2"
      >
        <Input name="searchTag" placeholder="Search by Tag" showLabel={false} />
        <Button 
          type="submit"
          disabled={!isFetched}
          >
            Search
          </Button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="text-left ">
            <th>English/Portuguese</th>
            <th>Audio</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((phrase:any) => (
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
  )
}