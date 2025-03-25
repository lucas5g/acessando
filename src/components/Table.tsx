import { keepPreviousData, useQuery } from "@tanstack/react-query";
import AudioPlayer from "./AudioPlayer";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { useAppContext } from "@/providers/AppProvider";


export function Table() {

  const { uri, search, setSearch, fieldsTable, fieldsFilter } = useAppContext()

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

          const formData = new FormData(event.currentTarget)

          const data = Object.fromEntries(formData) as Record<string, string>
          
          const params = new URLSearchParams(data).toString()
          console.log({ data, params })


          setSearch(`/${uri}?${params}`)
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2 overflow-clip">

          {Object.entries(fieldsFilter).map(([key, value]) => (
            <Input
              key={key}
              name={key}
              placeholder={value}
              required={false}
            />
          ))}
        </div>
        {/* <Input
          name="searchTag"
          placeholder="Search by Tag"
          showLabel={false}
          required={false}

        /> */}
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
              {Object.values(fieldsTable).map((value) => (
                <th key={value}>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: any) => {

              return (
                <tr
                  key={row.id}
                  className="border-b last:border-0 hover:bg-gray-800 transition "
                >
                  {Object.keys(fieldsTable).map((key, index) => {

                    if (key === 'audio') {
                      return (
                        <td key={key} className="py-1">
                          <AudioPlayer phraseId={row.id} />
                        </td>
                      )
                    }

                    if (key === 'englishPortuguese') {
                      return (
                        <td key={key} className="py-1">
                          <p dangerouslySetInnerHTML={{ __html: row[key] }} />
                        </td>
                      )
                    }

                    return (

                      <td
                        key={key}
                        className={`py-4 ${index === 0 && 'pl-1'} `}
                      >
                        {row[key]}
                      </td>
                    )
                  })}

                </tr>
              )
            })}

          </tbody>
        </table>
      }
    </Card >
  )
}